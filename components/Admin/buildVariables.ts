import { Ordering } from 'generated/globalTypes';
import {
  IntrospectionField,
  IntrospectionInputObjectType,
  IntrospectionNamedTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionType,
} from 'graphql';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'ra-core';
import { IntrospectionResult, IntrospectedResource } from 'ra-data-graphql';

import getFinalType from './getFinalType';
import isList from './isList';

export default (introspectionResults: IntrospectionResult) =>
  (
    resource: IntrospectedResource,
    raFetchMethod: string,
    params: any,
    queryType: IntrospectionField,
  ) => {
    const preparedParams = prepareParams(
      params,
      queryType,
      introspectionResults,
    );

    switch (raFetchMethod) {
      case GET_LIST: {
        return buildGetListVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams,
        );
      }
      case GET_MANY:
        return {
          filter: { id: { eqAny: preparedParams.ids } },
        };
      case GET_MANY_REFERENCE: {
        let variables = buildGetListVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams,
        );

        variables.filter = {
          ...variables.filter,
          [preparedParams.target]: preparedParams.id,
        };

        return variables;
      }
      case GET_ONE:
      case DELETE:
        return {
          id: preparedParams.id,
        };
      case CREATE: {
        return buildCreateVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams,
          queryType,
        );
      }
      case UPDATE: {
        return buildUpdateVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams,
          queryType,
        );
      }
    }
  };

const sanitizeValue = (type: IntrospectionType, value: any) => {
  if (type.name === 'Int') {
    return parseInt(value, 10);
  }

  if (type.name === 'Float') {
    return parseFloat(value);
  }

  return value;
};

const castType = (
  value: any,
  type: IntrospectionType | IntrospectionNonNullTypeRef,
) => {
  const realType = type.kind === 'NON_NULL' ? type.ofType : type;
  switch (`${realType.kind}:${(realType as IntrospectionNamedTypeRef).name}`) {
    case 'SCALAR:Int':
      return Number(value);

    case 'SCALAR:String':
      return String(value);

    case 'SCALAR:Boolean':
      return Boolean(value);

    default:
      return value;
  }
};

const prepareParams = (
  params: any,
  queryType: Partial<IntrospectionField>,
  introspectionResults: IntrospectionResult,
) => {
  const result: any = {};

  if (!params) {
    return params;
  }

  Object.keys(params).forEach(key => {
    const param = params[key];
    let arg: any = null;

    if (!param) {
      result[key] = param;
      return;
    }

    if (queryType && Array.isArray(queryType.args)) {
      arg = queryType.args.find(item => item.name === key);
    }

    if (param instanceof File) {
      result[key] = param;
      return;
    }

    if (param instanceof Date) {
      result[key] = param.toISOString();
      return;
    }

    if (
      param instanceof Object &&
      !Array.isArray(param) &&
      arg &&
      arg.type.kind === 'INPUT_OBJECT'
    ) {
      const args = (
        introspectionResults.types.find(
          item => item.kind === arg.type.kind && item.name === arg.type.name,
        ) as IntrospectionInputObjectType
      ).inputFields;
      result[key] = prepareParams(param, { args }, introspectionResults);
      return;
    }

    if (
      param instanceof Object &&
      !(param instanceof Date) &&
      !Array.isArray(param)
    ) {
      result[key] = prepareParams(param, queryType, introspectionResults);
      return;
    }

    if (!arg) {
      result[key] = param;
      return;
    }

    result[key] = castType(param, arg.type);
  });

  return result;
};

const buildGetListVariables =
  (introspectionResults: IntrospectionResult) =>
  (resource: IntrospectedResource, _raFetchMethod: string, params: any) => {
    let variables: Partial<{
      filter: { [key: string]: any };
      limit: number;
      offset: number;
      order: { [key: string]: Ordering };
    }> = { filter: {} };
    if (params.filter) {
      variables.filter = Object.keys(params.filter).reduce((acc, key) => {
        if (key === 'ids') {
          return { ...acc, ids: params.filter[key] };
        }

        if (typeof params.filter[key] === 'object') {
          const type = introspectionResults.types.find(
            t => t.name === `${resource.type.name}Filter`,
          );
          const filterSome = (
            type as IntrospectionInputObjectType
          )?.inputFields?.find(t => t.name === `${key}_some`);

          if (filterSome) {
            const filter = Object.keys(params.filter[key]).reduce(
              (acc, k) => ({
                ...acc,
                [`${k}_in`]: params.filter[key][k],
              }),
              {},
            );
            return { ...acc, [`${key}_some`]: filter };
          }
        }

        const parts = key.split('.');

        if (parts.length > 1) {
          if (parts[1] === 'id') {
            const type = introspectionResults.types.find(
              t => t.name === `${resource.type.name}Filter`,
            );
            const filterSome = (
              type as IntrospectionInputObjectType
            )?.inputFields?.find(t => t.name === `${parts[0]}_some`);

            if (filterSome) {
              return {
                ...acc,
                [`${parts[0]}_some`]: { id: params.filter[key] },
              };
            }

            return { ...acc, [parts[0]]: { id: params.filter[key] } };
          }

          const resourceField = resource.type.fields.find(
            f => f.name === parts[0],
          )!;
          const type = getFinalType(resourceField.type);
          return {
            ...acc,
            [key]: sanitizeValue(type, params.filter[key]),
          };
        }

        const resourceField = resource.type.fields.find(f => f.name === key);

        if (resourceField) {
          const type = getFinalType(resourceField.type);
          const isAList = isList(resourceField.type);

          if (isAList) {
            return {
              ...acc,
              [key]: Array.isArray(params.filter[key])
                ? params.filter[key].map((value: any) =>
                    sanitizeValue(type, value),
                  )
                : sanitizeValue(type, [params.filter[key]]),
            };
          }

          return {
            ...acc,
            [key]: sanitizeValue(type, params.filter[key]),
          };
        }

        return { ...acc, [key]: params.filter[key] };
      }, {});
    }

    if (params.pagination) {
      const page = parseInt(params.pagination.page, 10) - 1;
      const perPage = parseInt(params.pagination.perPage, 10);
      variables.limit = perPage;
      variables.offset = page * perPage;
    }

    if (params.sort) {
      variables.order = {
        [params.sort.field]: params.sort.order,
      };
    }

    return variables;
  };

const buildUpdateVariables =
  (introspectionResults: IntrospectionResult) =>
  (
    resource: IntrospectedResource,
    _raFetchMethod: any,
    { id, data }: any,
    _queryType: IntrospectionField,
  ) => {
    const setArgType = `Update${resource.type.name}Input`;
    const args = introspectionResults.types.find(
      item => item.name === setArgType,
    ) as IntrospectionInputObjectType;
    return {
      id,
      set: Object.keys(data).reduce((acc, key) => {
        if (!args.inputFields.some(field => field.name === key)) {
          return acc;
        }

        if (Array.isArray(data[key])) {
          /*TODO: Array update not implemented for "${key}"*/
          return acc;
        }

        if (typeof data[key] === 'object') {
          /*TODO: Array update not implemented for "${key}"*/
          return acc;
        }

        return {
          ...acc,
          [key]: data[key],
        };
      }, {}),
    };
  };

const buildCreateVariables =
  (introspectionResults: IntrospectionResult) =>
  (
    resource: IntrospectedResource,
    _raFetchMethod: any,
    { id, data }: any,
    _queryType: IntrospectionField,
  ) => {
    const setArgType = `Create${resource.type.name}Input`;
    const args = introspectionResults.types.find(
      item => item.name === setArgType,
    ) as IntrospectionInputObjectType;
    return {
      id,
      data: Object.keys(data).reduce((acc, key) => {
        if (!args.inputFields.some(field => field.name === key)) {
          return acc;
        }

        if (Array.isArray(data[key])) {
          /*TODO: Array update not implemented for "${key}"*/
          return acc;
        }

        if (typeof data[key] === 'object') {
          /*TODO: Array update not implemented for "${key}"*/
          return acc;
        }

        return {
          ...acc,
          [key]: data[key],
        };
      }, {}),
    };
  };

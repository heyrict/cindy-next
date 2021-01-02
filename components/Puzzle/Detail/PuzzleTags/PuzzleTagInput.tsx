import React from 'react';
import reactSelectTheme from 'theme/react-select';
import { toast } from 'react-toastify';
import { asSearch } from 'common/search';

import AsyncCreatableSelect from 'react-select/async-creatable';

import { ApolloConsumer } from '@apollo/client'
import { PUZZLE_TAGS_SEARCH_QUERY } from 'graphql/Queries/Tag';

import {
  PuzzleTagsSearchQuery,
  PuzzleTagsSearchQueryVariables,
} from 'graphql/Queries/generated/PuzzleTagsSearchQuery';
import { PuzzleTagInputOptionType } from './types';

class PuzzleTagInput extends React.PureComponent {
  value: PuzzleTagInputOptionType | undefined;
  waitHandle: number | null = null;

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <AsyncCreatableSelect<PuzzleTagInputOptionType>
            isClearable
            theme={reactSelectTheme}
            styles={{
              input: provided => ({
                ...provided,
                minWidth: 100,
                cursor: 'text',
              }),
            }}
            onChange={(value, { action }) => {
              console.log(value);
              if (action === 'clear') {
                this.value = undefined;
                return;
              }
              if (!value) return;
              this.value = value as PuzzleTagInputOptionType;
            }}
            loadOptions={inputValue =>
              new Promise(resolve => {
                if (this.waitHandle) window.clearTimeout(this.waitHandle);
                this.waitHandle = window.setTimeout(() => {
                  resolve(
                    client
                      .query<
                        PuzzleTagsSearchQuery,
                        PuzzleTagsSearchQueryVariables
                      >({
                        query: PUZZLE_TAGS_SEARCH_QUERY,
                        variables: {
                          search: asSearch(inputValue),
                          limit: 8,
                        },
                        fetchPolicy: 'network-only',
                      })
                      .then(({ data, errors }) => {
                        if (errors) {
                          toast.error(JSON.stringify(errors));
                          return [];
                        }
                        if (!data || !data.tags) return [];
                        return data.tags.map(tag => ({
                          id: tag.id,
                          value: tag.name,
                          label: tag.name,
                          created: tag.created,
                        }));
                      }),
                  );
                }, 1000);
              })
            }
          />
        )}
      </ApolloConsumer>
    );
  }

  getValue() {
    return this.value;
  }
}

export default PuzzleTagInput;

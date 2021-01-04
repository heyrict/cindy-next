import { FieldPolicy, Reference } from "@apollo/client/cache";

export function offsetLimitPagination<T = Reference>(
  override: FieldPolicy<T[]>
): FieldPolicy<T[]> {
  return {
    keyArgs: false,
    merge(existing, incoming, { args }) {
      const merged = existing ? existing.slice(0) : [];
      if (args) {
        const { offset = 0 } = args;
        for (let i = 0; i < incoming.length; i++) {
          merged[offset + i] = incoming[i];
        };
      } else {
        merged.push.apply(merged, incoming);
      }
      return merged;
    },
    read(existing, options) {
      const { args, readField } = options;
      console.log(options);
      if (existing) {
        if (args) {
          const { limit, offset = 0 } = args;
          let list = limit ? existing.slice(offset, offset + limit) : existing.slice(offset);
          if (list.length >= limit) return list
        } else {
          if (existing.length > 0) return existing;
        }
      }
    },
    ...override
  }
}

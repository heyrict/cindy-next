import { gql } from '@apollo/client';

export const ADD_BOOKMARK_MUTATION = gql`
  mutation AddBookmarkMutation($puzzleId: Int!, $value: Int!) {
    createBookmark(data: { puzzleId: $puzzleId, value: $value }) {
      id
      value
    }
  }
`;

export const UPDATE_BOOKMARK_MUTATION = gql`
  mutation UpdateBookmarkMutation($id: Int!, $value: Int!) {
    updateBookmark(id: $id, set: { value: $value }) {
      id
      value
    }
  }
`;

// TODO these mutations are created upon splitting the upsert mutation above
export const DELETE_BOOKMARK_MUTATION = gql`
  mutation DeleteBookmarkMutation($id: Int!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`;

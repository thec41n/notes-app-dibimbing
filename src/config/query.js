import { gql } from '@apollo/client';

export const GET_NOTE_BY_ID = gql`
  query GetNoteById($id: ID!) {
    note(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;
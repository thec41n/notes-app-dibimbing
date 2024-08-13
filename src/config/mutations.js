import { gql } from "@apollo/client";

export const ADD_NOTE = gql`
  mutation AddNote($title: String!, $body: String!) {
    addNote(title: $title, body: $body) {
      id
      title
      body
      createdAt
    }
  }
`;
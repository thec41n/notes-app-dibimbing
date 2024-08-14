const { ApolloServer, gql } = require("apollo-server");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notes_app",
  password: "123",
  port: 5432,
});

const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    body: String!
    createdAt: String
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }

  type Mutation {
    addNote(title: String!, body: String!): Note
    updateNote(id: ID!, title: String!, body: String!): Note
  }
`;

const resolvers = {
  Query: {
    notes: async () => {
      const res = await pool.query(
        'SELECT id, title, body, created_at AS "createdAt" FROM notes ORDER BY id ASC'
      );
      return res.rows;
    },
    note: async (_, { id }) => {
      const res = await pool.query(
        'SELECT id, title, body, created_at AS "createdAt" FROM notes WHERE id = $1',
        [id]
      );
      return res.rows[0];
    },
  },
  Mutation: {
    addNote: async (_, { title, body }) => {
      const res = await pool.query(
        "INSERT INTO notes (title, body, created_at) VALUES ($1, $2, NOW()) RETURNING *",
        [title, body]
      );
      return res.rows[0];
    },
    updateNote: async (_, { id, title, body }) => {
      const res = await pool.query(
        "UPDATE notes SET title = $1, body = $2, created_at = NOW() WHERE id = $3 RETURNING *",
        [title, body, id]
      );
      return res.rows[0];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

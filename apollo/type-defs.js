import { gql } from "@apollo/client";

export const typeDefs = gql`
  type ShoppingItem {
    id: ID!
    name: String!
    picked: Boolean!
  }

  type Query {
    items: [ShoppingItem]!
  }
`;

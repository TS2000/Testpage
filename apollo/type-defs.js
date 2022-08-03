import { gql } from "@apollo/client";

export const typeDefs = gql`
  type ShoppingItem {
    id: String!
    name: String!
    picked: Boolean!
  }

  input CreateItemInput {
    name: String!
    picked: Boolean!
  }

  input UpdateItemInput {
    id: String!
    name: String
    picked: Boolean
  }

  type Query {
    items: [ShoppingItem]!
  }

  type Mutation {
    createItem(input: CreateItemInput!): ShoppingItem
    updateItem(input: UpdateItemInput!): String
    deleteItem(id: String!): String
  }
`;

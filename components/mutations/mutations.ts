import gql from "graphql-tag";

export const CreateMutation = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      picked
    }
  }
`;
export const ItemsQuery = gql`
  query ItemsQuery {
    items {
      id
      name
      picked
    }
  }
`;
export const DeleteMutation = gql`
  mutation DeleteItem($id: String!) {
    deleteItem(id: $id)
  }
`;
export const UpdateMutation = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input)
  }
`;

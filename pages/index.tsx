import type { NextPage } from "next";
import Head from "next/head";
import ShoppingListItem from "../components/ShoppingListItem";
import { MongoClient } from "mongodb";
import AddItemForm from "../components/AddItemForm";
import { ShoppingItem } from "../components/types/types";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { initializeApollo } from "../apollo/client";
import { useLazyQuery, useQuery } from "@apollo/client";

interface Props {
  shoppingItems: ShoppingItem[];
}

const ItemsQuery = gql`
  query ItemsQuery {
    items {
      id
      name
      picked
    }
  }
`;

const Home: NextPage<Props> = (props) => {
  const { loading, error, data, refetch } = useQuery(ItemsQuery);

  const shoppingItems = data ? data.items : [];
  const refetchItems = () => refetch();

  return (
    <>
      <Head>
        <title>Shopping List</title>
      </Head>
      <div className="container mx-auto my-5">
        <h1 onClick={refetchItems} className="text-white text-3xl text-center">
          Shopping List
        </h1>
        <div className="my-4 px-3 space-y-2 mx-auto max-w-md">
          <AddItemForm getShoppingItems={refetchItems}></AddItemForm>
          {shoppingItems.map((item: ShoppingItem) => (
            <ShoppingListItem
              getShoppingItems={refetchItems}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// export const getStaticProps = async () => {
//   // const client = await MongoClient.connect(
//   //   "mongodb+srv://" +
//   //     process.env.API_KEY +
//   //     ".mongodb.net/shoppingListDb?retryWrites=true&w=majority"
//   // );
//   // const db = client.db();
//   // const shoppingListCollection = db.collection("shoppingList");
//   //
//   // const shoppingItems = await shoppingListCollection.find().toArray();
//   // await client.close();
//   //
//   // return {
//   //   props: {
//   //     shoppingItems: shoppingItems.map((item) => ({
//   //       name: item.name,
//   //       picked: item.picked,
//   //       id: item._id.toString(),
//   //     })),
//   //   },
//   //   revalidate: 10,
//   // };
//
//   const apolloClient = initializeApollo();
//
//   await apolloClient.query({
//     query: ItemsQuery,
//   });
//
//   const emptyState = {
//     data: {
//       items: [],
//     },
//   };
//
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// };

export default Home;

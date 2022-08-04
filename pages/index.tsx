import type { NextPage } from "next";
import Head from "next/head";
import { ShoppingItem } from "../components/types/types";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Modal from "../components/Modal";
import AddItemForm from "../components/AddItemForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ShoppingListItem from "../components/ShoppingListItem";

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
  const [showSpinner, setShowSpinner] = useState(false);
  const { loading, error, data, refetch } = useQuery(ItemsQuery);

  const shoppingItems = data ? data.items : [];
  const refetchItems = () => refetch();

  useEffect(() => {
    setShowSpinner(loading);
  }, [loading]);

  const setLoadingSpinner = (newStatus: boolean) => {
    setShowSpinner(newStatus);
  };

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
          <AddItemForm
            setLoadingSpinner={setLoadingSpinner}
            getShoppingItems={refetchItems}
          ></AddItemForm>
          {showSpinner && <LoadingSpinner></LoadingSpinner>}
          {shoppingItems.map((item: ShoppingItem) => (
            <ShoppingListItem
              getShoppingItems={refetchItems}
              setLoadingSpinner={setLoadingSpinner}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <Modal></Modal>
    </>
  );
};

export const getStaticProps = async () => {
  // const apolloClient = initializeApollo();

  // await apolloClient.query({
  //   query: StandardItemsQuery,
  // });

  // console.log("DATA:   ", data);

  // return addApolloState(apolloClient, {
  //   props: {},
  //   revalidate: 1,
  // });

  return {
    props: {},
  };
};

export default Home;

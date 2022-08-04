import type { NextPage } from "next";
import Head from "next/head";
import { ShoppingItem, StandardItem } from "../components/types/types";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Modal from "../components/Modal";
import AddItemForm from "../components/AddItemForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ShoppingListItem from "../components/ShoppingListItem";
import Image from "next/image";
import plusImg from "../public/plus-svgrepo-com.svg";
import { CreateMutation, ItemsQuery } from "../components/mutations/mutations";

interface Props {
  shoppingItems: ShoppingItem[];
}

const Home: NextPage<Props> = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showStandardItems, setShowStandardItems] = useState(false);
  const { loading, error, data, refetch } = useQuery(ItemsQuery);

  const shoppingItems = data ? data.items : [];
  const refetchItems = () => refetch();

  const setLoadingSpinner = (newStatus: boolean) => {
    setShowSpinner(newStatus);
  };

  const showStandartItems = () => {
    setShowStandardItems(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const [
    createItemMutation,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CreateMutation);

  useEffect(() => {
    setShowSpinner(loading || createLoading);
  }, [loading, createLoading]);

  const mergeSelectedItems = async (newItems: StandardItem[]) => {
    setShowStandardItems(false);

    await Promise.all(
      newItems.map(async (item) => {
        await createItemMutation({
          variables: {
            input: {
              name: item.name,
              picked: false,
            },
          },
        });
      })
    );

    await refetch();
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
      <button
        className="flex items-center mb-16 justify-center m-auto"
        onClick={showStandartItems}
      >
        <div className="inline-flex items-center justify-center mr-2 p-3 text-xs font-medium text-gray-500 bg-green-500 rounded-full">
          <Image src={plusImg} />
        </div>
        <span className="text-gray-500 font-semibold">Add standard items</span>
      </button>
      {showStandardItems && (
        <Modal
          onCloseHandler={setShowStandardItems}
          onAddHandler={mergeSelectedItems}
        ></Modal>
      )}
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

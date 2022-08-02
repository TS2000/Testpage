import type { NextPage } from "next";
import Head from "next/head";
import ShoppingItem from "../components/ShoppingItem";
import { MongoClient } from "mongodb";

export interface ShoppingItem {
  name: string;
  id: string;
  picked: boolean;
}

interface Props {
  shoppingItems: ShoppingItem[];
}

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Shopping List</title>
      </Head>
      <div className="container mx-auto my-5">
        <h1 className="text-white text-3xl text-center">Shopping List</h1>
        <div className="my-4 px-3 space-y-2 mx-auto max-w-md">
          {props.shoppingItems.map((item) => (
            <ShoppingItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://" +
      process.env.API_KEY +
      ".mongodb.net/shoppingListDb?retryWrites=true&w=majority"
  );
  const db = client.db();
  const shoppingListCollection = db.collection("shoppingList");

  const shoppingItems = await shoppingListCollection.find().toArray();
  await client.close();

  return {
    props: {
      shoppingItems: shoppingItems.map((item) => ({
        name: item.name,
        picked: item.picked,
        id: item._id.toString(),
      })),
    },
  };
};

export default Home;

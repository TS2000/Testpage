import type { NextPage } from "next";
import Head from "next/head";
import { MongoClient } from "mongodb";

interface ShoppingItem {
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
        <h4>Shopping List</h4>
        <div className="my-2 space-y-2">
          {props.shoppingItems.map((item) => (
            <div className="flex pl-3 rounded bg-gray-200" key={item.id}>
              <p className="inline-flex items-center">{item.name}</p>
              <a className="inline-flex items-center justify-center ml-auto px-2 py-3 text-xs font-medium text-gray-500 bg-gray-300 rounded">
                {item.picked ? <>picked</> : <>not picked</>}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://thomas-cc:dyuICI95mJtp9CXx@cluster0.8ioiysa.mongodb.net/shoppingListDb?retryWrites=true&w=majority"
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

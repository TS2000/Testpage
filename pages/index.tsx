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
        <title>TS Test site</title>
      </Head>
      <main>
        <h4>TS Next Site</h4>
        {props.shoppingItems.map((item) => (
          <div className="max-w-md shadow-md">
            <p key={item.id}>
              {item.name} {item.picked ? <span>J</span> : <span>N</span>}
            </p>
          </div>
        ))}
      </main>
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

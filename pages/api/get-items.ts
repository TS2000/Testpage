import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.API_KEY}.mongodb.net/shoppingListDb?retryWrites=true&w=majority`
    );

    try {
      const db = client.db();
      const shoppingListCollection = db.collection("shoppingList");

      const itemsfromDb = await shoppingListCollection.find().toArray();
      const shoppingItems = itemsfromDb.map((item) => ({
        name: item.name,
        picked: item.picked,
        id: item._id.toString(),
      }));

      res.status(200).json(shoppingItems);
    } finally {
      client.close();
    }
  }
}

export default handler;

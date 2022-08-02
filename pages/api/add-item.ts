import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ShoppingItemDraft } from "../../components/types/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.API_KEY}.mongodb.net/shoppingListDb?retryWrites=true&w=majority`
    );

    try {
      const itemData: ShoppingItemDraft = req.body;
      const db = client.db();
      const shoppingListCollection = db.collection("shoppingList");

      const result = await shoppingListCollection.insertOne(itemData);

      res.status(201).json({ message: "Item inserted!" });
    } finally {
      client.close();
    }
  }
}

export default handler;

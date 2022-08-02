import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.API_KEY}.mongodb.net/shoppingListDb?retryWrites=true&w=majority`
    );

    try {
      const data = req.body;
      const db = client.db();
      const shoppingListCollection = db.collection("shoppingList");

      const query = { name: data.name };
      const result = await shoppingListCollection.deleteOne(query);

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Successfully deleted one document." });
      } else {
        res.status(204).json({
          message: "No documents matched the query. Deleted 0 documents.",
        });
      }
    } finally {
      client.close();
    }
  }
}

export default handler;

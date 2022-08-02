import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// /api/new-meetup
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.API_KEY}.mongodb.net/shoppingListDb?retryWrites=true&w=majority`
    );

    try {
      const data = req.body;
      const db = client.db();

      const newId = new ObjectId(data.id); // Not working as filter in Mongo atlas ? ...
      const filter = { name: data.name };
      const options = { upsert: false };
      const updateDoc = {
        $set: {
          picked: data.picked,
        },
      };

      const shoppingListCollection = db.collection("shoppingList");
      const result = await shoppingListCollection.findOneAndUpdate(
        filter,
        updateDoc,
        options
      );

      res.status(201).json({ message: "Picked status inserted!" });
    } finally {
      client.close();
    }
  }
}

export default handler;

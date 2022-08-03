import { MongoClient, ObjectId } from "mongodb";

export const resolvers = {
  Query: {
    async items(_parent, _args, _context, _info) {
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

        return shoppingItems;
      } catch (e) {
        return [];
      }
    },
  },
  Mutation: {
    async createItem(parent, args, context) {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.API_KEY}.mongodb.net/shoppingListDb?retryWrites=true&w=majority`
      );

      try {
        const itemData = {
          name: args.input.name,
          picked: args.input.picked,
        };

        const db = client.db();
        const shoppingListCollection = db.collection("shoppingList");
        const resultId = await shoppingListCollection.insertOne(itemData);

        const result = {
          name: args.input.name,
          picked: args.input.picked,
          id: resultId.insertedId.toString(),
        };
        return result;
      } catch (e) {
        return {};
      }
    },
    async deleteItem(parent, args, context) {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.API_KEY}.mongodb.net/shoppingListDb?retryWrites=true&w=majority`
      );

      try {
        const db = client.db();
        const shoppingListCollection = db.collection("shoppingList");

        const query = { _id: new ObjectId(args.id) };

        const result = await shoppingListCollection.deleteOne(query);

        return result.deletedCount;
      } catch (e) {
        return {};
      }
    },
    async updateItem(parent, args, context) {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.API_KEY}.mongodb.net/shoppingListDb?retryWrites=true&w=majority`
      );

      try {
        const db = client.db();

        const newId = new ObjectId(args.input.id);
        const filter = { _id: newId };
        const options = { upsert: false };

        // Mutation des Namens auch erlauben ....
        const updateDoc = {
          $set: {
            picked: args.input.picked,
          },
        };

        const shoppingListCollection = db.collection("shoppingList");
        const resultObj = await shoppingListCollection.findOneAndUpdate(
          filter,
          updateDoc,
          options
        );

        return args.input.id;
      } catch (e) {
        return {};
      }
    },
  },
};

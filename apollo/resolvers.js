export const resolvers = {
  Query: {
    items(_parent, _args, _context, _info) {
      return { id: 1, name: "Bananen", picked: false };
    },
  },
};

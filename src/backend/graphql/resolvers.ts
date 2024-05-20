//import { Product } from '../models/Product';

const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo Server!',
    products: async () => 'await Product.find()',
  },
  Mutation: {
    addProduct: async (_: any, { name, description, price }: any) => {
      const product = 'new Product({ name, description, price });'
      //await product.save();
      return product;
    },
  },
};

export default resolvers;
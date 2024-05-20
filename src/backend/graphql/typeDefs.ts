import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String
    products: [Product]
  }

  type Mutation {
    addProduct(name: String!, description: String!, price: Float!): Product
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String
  }
`;

export default typeDefs;
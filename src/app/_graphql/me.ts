import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query {
    user {
      _id
      email
      name
      roles
    }
    exp
}`

export const ME_ALL_QUERY = gql`
  query {
    user {
      _id
      email
      name
      CART
      roles
    }
    exp
}`
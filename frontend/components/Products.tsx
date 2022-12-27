import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import styled from "styled-components";
import { perPage } from "../config";
import Product from "./Product";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page = 1 }) {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) return <p>Loading....</p>;

  return (
    <ProductsList>
      {data.allProducts.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </ProductsList>
  );
}

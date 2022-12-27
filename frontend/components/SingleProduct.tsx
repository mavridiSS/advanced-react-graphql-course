import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  min-height: 800px;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  grid-gap: 20px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <img src={Product.photo.image.publicUrlTransformed} alt={Product.name} />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}

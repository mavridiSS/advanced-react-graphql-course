import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  const handleClick = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteProduct();
    }
  };
  return (
    <button disabled={loading} onClick={handleClick} type="button">
      {children}
    </button>
  );
}

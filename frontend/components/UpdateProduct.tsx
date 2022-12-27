import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { SINGLE_PRODUCT_QUERY } from "./SingleProduct";
import Form from "./styles/Form";

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, clearForm } = useForm(data?.Product);

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={inputs.name}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={inputs.price}
          />
        </label>
        <label htmlFor="name">
          Description
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={inputs.description}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}

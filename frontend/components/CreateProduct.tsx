import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import Router from "next/router";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        photo: { create: { image: $image, altText: $name } }
        status: "AVAILABLE"
      }
    ) {
      id
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm({});
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import React from "react";
import { perPage } from "../config";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";

export const ALL_PRODUCTS_COUNT_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page = 1 }) {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_COUNT_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(data._allProductsMeta.count / perPage);
  return (
    <PaginationStyles>
      <Link href={`/products/${page - 1}`} aria-disabled={page === 1}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
    </PaginationStyles>
  );
}

import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import React from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    { fetchPolicy: "no-cache" }
  );
  const items = data?.allProducts || [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const {
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items,
    onInputValueChange({ inputValue }) {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push(`/product/${selectedItem.id}`);
    },
    itemToString(item) {
      return item?.name || "";
    },
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !loading && !items.length && (
          <DropDownItem>Sorry, no items found. </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}

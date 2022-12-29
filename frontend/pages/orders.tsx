import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import DisplayError from "../components/ErrorMessage";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import formatMoney from "../lib/formatMoney";

const ORDERS_QUERY = gql`
  query {
    allOrders {
      id
      total
      charge
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInOrder = (order) =>
  order.items.reduce((tally, item) => tally + item.quantity, 0);

export default function OrdersPage() {
  const { data, error, loading } = useQuery(ORDERS_QUERY, {});

  if (loading) return <p>Loading...</p>;

  if (error) return <DisplayError error={error} />;

  const orders = data.allOrders;

  return (
    <div>
      <h2>You have {orders.length} orders!</h2>
      <OrderUl>
        {orders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInOrder(order)}</p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? "" : "s"}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      id={item.id}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}

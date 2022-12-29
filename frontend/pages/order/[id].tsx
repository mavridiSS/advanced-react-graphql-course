import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import DisplayError from "../../components/ErrorMessage";
import OrderStyles from "../../components/styles/OrderStyles";
import formatMoney from "../../lib/formatMoney";

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
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

export default function OrderPage({ query }) {
  const orderId = query.id;
  const { data, error, loading } = useQuery(ORDER_QUERY, {
    variables: { id: orderId },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <DisplayError error={error} />;

  const order = data.Order;

  return (
    <OrderStyles>
      <p>
        <span>Order ID:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

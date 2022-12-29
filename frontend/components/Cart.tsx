import { timeStamp } from "console";
import React from "react";
import styled from "styled-components";
import calcTotalPrice from "../lib/calcTotalPrice";
import { useCart } from "../lib/CartState";
import formatMoney from "../lib/formatMoney";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import { useUser } from "./User";
import RemoveFromCart from "./RemoveFromCart";
import Checkout from "./Checkout";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ item }) => (
  <CartItemStyles>
    <img
      width="100"
      src={item.product.photo.image.publicUrlTransformed}
      alt={item.product.name}
    />
    <div>
      <h3>{item.product.name}</h3>
      <p>
        {formatMoney(item.product.price * item.quantity)}-
        <em>
          {item.quantity} &times; {formatMoney(item.product.price)} each
        </em>
      </p>
    </div>
    <RemoveFromCart id={item.id} />
  </CartItemStyles>
);

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!user) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
      </header>
      <CloseButton type="button" onClick={closeCart}>
        &times;
      </CloseButton>
      <ul>
        {user.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}

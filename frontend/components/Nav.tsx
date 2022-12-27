import Link from "next/link";
import React from "react";
import { useCart } from "../lib/CartState";
import CartCount from "./CartCount";
import SignOut from "./SignOut";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button onClick={openCart} type="button">
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && <Link href="/signin">Sign in</Link>}
    </NavStyles>
  );
}

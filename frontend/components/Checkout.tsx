import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import styled from "styled-components";
import NProgress from "nprogress";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import SickButton from "./styles/SickButton";
import { useCart } from "../lib/CartState";
import { CURRENT_USER_QUERY } from "./User";

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

function CheckoutForm() {
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const { closeCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    NProgress.start();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      setError(error);
      NProgress.done();
      return;
    }

    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    router.push({
      pathname: "/order/[id]",
      query: {
        id: order.data.checkout.id,
      },
    });
    closeCart();
    setLoading(false);
    NProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <SickButton>Checkout now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  const [stripe, setStripe] = React.useState();

  const loadStripeLib = async () => {
    const stripeLib = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY.toString()
    );
    setStripe(stripeLib);
  };

  React.useEffect(() => {
    loadStripeLib();
  }, []);
  if (!stripe) return null;

  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
}

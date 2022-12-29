import React from "react";
import SignIn from "./SignIn";
import { useUser } from "./User";

export default function Gater({ children }) {
  const user = useUser();
  if (!user) return <SignIn />;
  return children;
}

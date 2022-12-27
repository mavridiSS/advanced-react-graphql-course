import React from "react";
import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }) {
  if (!query.token)
    return (
      <div>
        <p>Sorry you must supply a reset token!</p>;
        <RequestReset />
      </div>
    );

  return <Reset token={query.token} />;
}

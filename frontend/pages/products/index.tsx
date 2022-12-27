import { useRouter } from "next/router";
import React from "react";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

export default function ProductsPage() {
  const router = useRouter();
  const page = router.query?.page ? parseInt(router.query?.page) : 1;
  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </div>
  );
}

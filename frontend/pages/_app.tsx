import React from "react";
import type { AppProps } from "next/app";
import Router from "next/router";

import NProgress from "nprogress";
import Page from "../components/Page";
import withData from "../lib/withData";
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import { CartStateProvider } from "../lib/CartState";
import Gater from "../components/Gater";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps, apollo }: AppProps) {
  return (
    <CartStateProvider>
      <ApolloProvider client={apollo}>
        <Page>
          <Gater>
            <Component {...pageProps} />
          </Gater>
        </Page>
      </ApolloProvider>
    </CartStateProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);

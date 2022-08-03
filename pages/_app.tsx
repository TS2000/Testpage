import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../apollo/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  // const apolloClient = useApollo(pageProps.initialApolloState);
  // const apolloClient = useApollo({
  //   data: {
  //     items: [],
  //   },
  // });

  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

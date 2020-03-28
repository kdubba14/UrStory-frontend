import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import Header from "../components/Header";
import MainDisplay from "../components/MainDisplay";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:7070/api/graphql",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <MainDisplay />
      </div>
    </ApolloProvider>
  );
};

export default App;

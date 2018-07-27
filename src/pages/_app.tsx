import App, { Container } from 'next/app';
import React from 'react';
import withApolloClient from '~/lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '~/store/configure';

interface Props {
  Component: any;
  ctx: any;
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: Props) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  props: any;

  render() {
    const { Component, pageProps, apolloClient, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </Container>
    );
  }
}

export default withApolloClient(
  withRedux(createStore)(withReduxSaga({ async: true })(MyApp))
);

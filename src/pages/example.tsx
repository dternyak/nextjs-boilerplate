import React, { Component } from 'react';
import FILMS_QUERY from '~/graphql/films.graphql';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { connect, Dispatch } from 'react-redux';
import { clockActions } from '~/modules/clock';
import AntWrap from '~/components/AntWrap';


interface Film {
  title: string;
}

interface Response {
  allFilms: any;
  error: boolean;
  loading: boolean;
}

interface Props {
  isLoading: boolean;
  films?: Film[];
  error: boolean;
  dispatch: Dispatch;
  lastUpdate: Date;
}

const Clock = styled.div`
  padding: 20px;
`;

const pad = (n: number) => (n < 10 ? `0${n}` : n);

const format = (date: Date) => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

class Example extends Component<Props, any> {
  static async getInitialProps(props: any) {
    const { store, isServer } = props;
    store.dispatch(clockActions.tickClock({ light: isServer }));
    return { isServer };
  }

  componentDidMount() {
    this.props.dispatch(clockActions.startClock({}));
  }

  render() {
    const { isLoading, error, films } = this.props;

    if (error) return <div>Error loading blog post.</div>;

    return (
      <AntWrap>
        <h2>Redux Sagas:</h2>
        <Clock>{format(new Date(this.props.lastUpdate))}</Clock>

        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <>
          <h2>Movie List through GraphQL: </h2>

            {films.map((film, index: number) => (
              <div key={index}>{film.title}</div>
            ))
            }
          </>
        )}
      </AntWrap>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { clock } = state;

  return {
    lastUpdate: clock.lastUpdate
  };
};

const withConnect = connect(mapStateToProps);

const withFilms = graphql<Response>(FILMS_QUERY, {
  name: 'findFilms'
});

const mapFilmsToProps = ({ findFilms }: { findFilms: Response }) => ({
  films: findFilms.allFilms,
  error: findFilms.error,
  isLoading: findFilms.loading
});

export default compose(
  withConnect,
  withFilms,
  withProps(mapFilmsToProps)
)(Example);

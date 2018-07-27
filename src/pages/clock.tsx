import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { connect, Dispatch } from 'react-redux';
import { clockActions } from '../modules/clock';
import AntWrap from '~/components/AntWrap';

interface Props {
  error: boolean;
  dispatch: Dispatch;
  lastUpdate: Date;
}

const AppClock = styled.div`
  padding: 20px;
`;

const pad = (n: number) => (n < 10 ? `0${n}` : n);

const format = (date: Date) => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

class Clock extends Component<Props, any> {
  static async getInitialProps(props: any) {
    const { store, isServer } = props;
    store.dispatch(clockActions.tickClock({ light: isServer }));
    return { isServer };
  }

  componentDidMount() {
    this.props.dispatch(clockActions.startClock({}));
  }

  render() {
    const { error } = this.props;

    if (error) return <div>Error loading blog post.</div>;

    return (
      <AntWrap>
        <h2>Redux Sagas:</h2>
        <AppClock>{format(new Date(this.props.lastUpdate))}</AppClock>
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

export default compose(withConnect)(Clock);

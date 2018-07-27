import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect, Dispatch } from 'react-redux';
import { profileActions } from '~/modules/profile';
import { bindActionCreators } from 'redux';
import AntWrap from '~/components/AntWrap';
import { Card } from 'antd';

interface Props {
  error: boolean;
  dispatch: Dispatch;
  lastUpdate: Date;
  profileUser: any;
}

class Profile extends Component<Props, any> {
  componentDidMount() {
    this.props.profileUser();
  }

  render() {
    return (
      <AntWrap>
        {this.props.email ? (
          <Card title="Profile" style={{ width: 300 }}>
            <h3>{this.props.email}</h3>
            <h3>{this.props.id}</h3>
          </Card>
        ) : (
          <h5>Loading...</h5>
        )}
      </AntWrap>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.profile.email,
    id: state.profile.id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(profileActions, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Profile);

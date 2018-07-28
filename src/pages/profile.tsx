import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { profileActions } from 'modules/profile';
import { bindActionCreators, Dispatch } from 'redux';
import AntWrap from 'components/AntWrap';
import { Card } from 'antd';
import { AppState } from 'store/reducers';

interface StateProps {
  email: AppState['profile']['email'];
  id: AppState['profile']['id'];
}

interface DispatchProps {
  profileUser: profileActions.TProfileUser;
}

type Props = StateProps & DispatchProps;

class Profile extends Component<Props> {
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

function mapStateToProps(state: AppState) {
  return {
    email: state.profile.email,
    id: state.profile.id
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(profileActions, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Profile);

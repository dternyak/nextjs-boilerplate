import Login, { LoginProps } from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { authActions } from 'modules/auth/index';
import React from 'react';
import { CheckboxProps } from 'antd/lib/checkbox';
import { AppState } from 'store/reducers';
import { bindActionCreators, Dispatch } from 'redux';

const { Tab, UserName, Password, Submit } = Login;

interface StateProps {
  email: AppState['profile']['email'];
  id: AppState['profile']['id'];
}

interface DispatchProps {
  loginUser: authActions.TLoginUser;
}

type Props = StateProps & DispatchProps

class LoginPro extends React.Component<Props> {
  state = {
    notice: '',
    type: 'tab1',
    autoLogin: true
  };

  onSubmit: LoginProps['onSubmit'] = (err, values) => {
    if (!err) {
      this.props.loginUser(values.username, values.password);
    } else {
      this.setState({
        notice: 'This combination of username and password is incorrect!'
      });
    }
  };

  onTabChange: LoginProps['onTabChange'] = key => {
    this.setState({
      type: key
    });
  };

  changeAutoLogin: CheckboxProps['onChange'] = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  render() {
    return (
      <Login
        defaultActiveKey={this.state.type}
        // onTabChange={this.onTabChange}
        onSubmit={this.onSubmit}
      >
        <Tab key="tab1" tab="Account">
          {this.state.notice && (
            <Alert
              style={{ marginBottom: 24 }}
              message={this.state.notice}
              type="error"
              showIcon
              closable
            />
          )}
          <UserName
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          />
          <Password
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          />
        </Tab>
        <div>
          <Checkbox
            checked={this.state.autoLogin}
            onChange={this.changeAutoLogin}
          >
            Keep me logged in
          </Checkbox>
          <a style={{ float: 'right' }} href="">
            Forgot password
          </a>
        </div>
        <Submit>Login</Submit>
        <div>
          <div style={{ textAlign: 'center' }}>
            <span>Don't have an account? </span> <a href="">Register</a>
          </div>
        </div>
      </Login>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(authActions, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(LoginPro);

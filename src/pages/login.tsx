import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import AntWrap from '~/components/AntWrap';
import LoginPro from '~/components/LoginPro';
import { Row, Col } from 'antd';

interface Props {
  error: boolean;
  dispatch: Dispatch;
  lastUpdate: Date;
  profileUser: any;
}

class Login extends Component<Props, any> {
  render() {
    return (
      <AntWrap>
        <Row gutter={16}>
          <Col md={{span: 12, offset: 6}} sm={16}>
            <LoginPro />
          </Col>
        </Row>
      </AntWrap>
    );
  }
}

export default Login;

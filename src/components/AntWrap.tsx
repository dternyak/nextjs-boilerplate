import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Content } = Layout;
import BasicHead from './BasicHead';

import Header from './Home/Header';
import Footer from './Home/Footer';

class AntWrap extends React.Component<any, any> {
  render() {
    const { children, withBreadcrumb } = this.props;
    return (
      <BasicHead>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          {withBreadcrumb && (
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          )}
          <div style={{ background: '#fff', paddingTop: 50, paddingBottom: 50, minHeight: 280 }}>
            {children}
          </div>
        </Content>
        <Footer />
      </BasicHead>
    );
  }
}
export default AntWrap;

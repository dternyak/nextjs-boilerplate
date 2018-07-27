import React from 'react';
import { Row, Col, Icon, Menu, Button, Popover } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router';

import { enquireScreen } from 'enquire-js';
import NProgress from 'nprogress';

const LOGO_URL =
  'https://gw.alipayobjects.com/zos/rmsportal/gVAKqIsuJCepKNbgbSwE.svg';

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
    routerChangeTimeout: null
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    enquireScreen(b => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });

    NProgress.configure({ easing: 'ease', speed: 500 });

    // TODO only start nprogress if onRouteChangeComplete has not fired within 1s
    Router.onRouteChangeStart = url => {
      NProgress.start();
    };

    Router.onRouteChangeComplete = () => {
      NProgress.done();
    };
    Router.onRouteChangeError = () => NProgress.done();
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  };

  render() {
    const { menuMode, menuVisible } = this.state;
    const { router } = this.props;

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav" selectedKeys={[router.pathname]}>
        <Menu.Item key="/clock">
          <Link href={'/clock'}>
            <a>clock</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/example">
          <Link href={'/example'}>
            <a>example</a>
          </Link>
        </Menu.Item>
        {menuMode === 'inline' && (
          <Menu.Item key="/login">
            <Link href={'/login'}>
              <a>Login</a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Link href={'/'}>
              <div id="logo">
                <img src={LOGO_URL} alt="logo" />
                <a>ANT DESIGN PRO</a>
              </div>
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              <div id="preview">
                <Link href={'/login'}>
                  <a>
                    <Button icon="eye-o">login</Button>
                  </a>
                </Link>
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Header);

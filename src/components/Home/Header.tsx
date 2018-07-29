import React from 'react';
import { Row, Col, Icon, Menu, Button, Popover } from 'antd';
import { MenuMode } from 'antd/lib/menu';
import Link from 'next/link';
import { SingletonRouter, withRouter } from 'next/router';
import Router from 'next/router';

import { isMobile } from 'is-mobile';
import NProgress from 'nprogress';

const LOGO_URL =
  'https://gw.alipayobjects.com/zos/rmsportal/gVAKqIsuJCepKNbgbSwE.svg';

interface RouteProps {
  router?: SingletonRouter;
}

interface OwnState {
  menuVisible: boolean;
  menuMode: MenuMode;
}

class Header extends React.Component<RouteProps, OwnState> {
  state = {
    menuVisible: false,
    menuMode: 'horizontal' as MenuMode
  };

  constructor(props: RouteProps) {
    super(props);
  }

  componentDidMount() {
    this.setState({ menuMode: isMobile() ? 'inline' : 'horizontal' });
    NProgress.configure({ easing: 'ease', speed: 500 });
    // nextjs has incorrect type definitions. They expect Router.events.on('routeChangeStart')
    // (https://github.com/zeit/next.js#router-events) ... but `.events` is undefined at runtime
    // @ts-ignore
    Router.onRouteChangeStart = () => NProgress.start();
    // @ts-ignore
    Router.onRouteChangeComplete = () => NProgress.done();
    // @ts-ignore
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
            // onVisibleChange={this.onMenuVisibleChange}
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

// @ts-ignore
export default withRouter(Header);

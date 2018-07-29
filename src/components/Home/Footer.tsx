import React from 'react';
import { Row, Col, Button } from 'antd';

function Footer() {
  return (
    <footer id="footer" className="dark">
      <div className="footer-wrap">
        <Row>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Ant Design</h2>
              <div>
                <a target="_blank " href="https://github.com/ant-design/ant-design-pro">
                  Ant Design Pro GitHub
                </a>
              </div>
              <div>
                <a target="_blank " href="http://ant.design">
                  Ant Design
                </a>
              </div>
              <div>
                <a href="http://mobile.ant.design">Ant Design Mobile</a>
              </div>
              <div>
                <a href="http://ng.ant.design">NG-ZORRO</a>
              </div>
              <div>
                <a target="_blank " href="https://github.com/websemantics/awesome-ant-design">
                  Awesome Ant Design
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Ant Design</h2>
              <div>
                <a href="http://scaffold.ant.design">Scaffolds</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://motion.ant.design">Ant Motion</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://library.ant.design/">Axure Library</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://ux.ant.design">Ant UX</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="https://github.com/dvajs/dva">dva </a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="https://github.com/dvajs/dva-cli">dva-cli </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Help</h2>
              <div>
                <a href="#">
                  Item 1
                </a>
              </div>
              <div>
                <a href="#">
                  Item 2
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>
                Misc
              </h2>
              <div>
                <a target="_blank" rel="noopener" href="http://ant.design/">Ant Design</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="https://antv.alipay.com/">AntV</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="https://eggjs.org/">Egg</a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar">
        <Col lg={6} sm={24}>
          <div className="translate-button">
            <Button ghost size="small" >
              English
            </Button>
          </div>
        </Col>
        <Col lg={18} sm={24}>
          <span style={{ marginRight: 12 }}>Copyright © 2018</span>
        </Col>
      </Row>
    </footer>
  );
}


export default Footer;

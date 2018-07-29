import React from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
// import { Button } from 'antd';

function Page2() {
  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>Let’s <span>Pro</span></h2>
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse className="page2-content">
            <p key="p" className="page-content">
              Check it out!
            </p>
            <div key="code1" className="home-code">
              <div>
                $ <span>git clone</span> git@github.com:dternyak/react-base.git
              </div>
              <div>$ cd react-base</div>
              <div>$ yarn install</div>
              <div>
                <p>$ yarn start</p>
              </div>
            </div>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;

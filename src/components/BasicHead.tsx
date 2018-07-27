import React  from 'react';
import Head from 'next/head';

import '~/styles/style.less';


export default class BasicHead extends React.Component<any, any> {


  render() {
    const { children } = this.props;
    return (
      <div>
        <Head>
          <title>Initial</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>

        {children}
      </div>
    );
  }
}

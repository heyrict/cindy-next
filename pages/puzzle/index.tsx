import React from 'react';
import { NextPageContext } from 'next';
import Router from 'next/router';

export default class extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (res) {
      res.writeHead(301, {
        Location: '/puzzles',
      });
      res.end();
    } else {
      Router.push('/puzzles');
    }
    return {};
  }
}

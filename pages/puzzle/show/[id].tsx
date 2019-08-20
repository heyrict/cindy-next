import React from 'react';
import { NextPageContext } from 'next';
import Router from 'next/router';

export default class extends React.Component {
  static async getInitialProps({ res, query }: NextPageContext) {
    if (res) {
      res.writeHead(301, {
        Location: `/puzzle/${query.id}`,
      });
      res.end();
    } else {
      Router.push('/puzzle/[id]', `/puzzle/${query.id}`);
    }
    return {};
  }
}

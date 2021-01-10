import React from 'react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    redirect: {
      destination: `/user/${query.id}`,
      permanent: true,
    },
  };
};

export default () => null;

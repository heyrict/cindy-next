import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/users`,
      permanent: true,
    },
  };
};

export default () => null;

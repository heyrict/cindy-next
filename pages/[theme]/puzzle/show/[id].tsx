import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    redirect: {
      destination: `/puzzle/${query.id}`,
      permanent: true,
    },
  };
};

export default () => null;

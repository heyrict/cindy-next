import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/puzzles`,
      permanent: true,
    },
  };
};

export default () => null;

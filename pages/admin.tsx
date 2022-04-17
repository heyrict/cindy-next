import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('../components/Admin'), { ssr: false });

const App = () => {
  return <Admin />;
};

export default App;

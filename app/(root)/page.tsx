import { auth } from '@/auth';

const Home = async () => {
  const session = await auth();

  console.log(session);
  return (
    <div className="text-3xl ">
      <p className="font-space-grotesk">Space Grotesk</p>
    </div>
  );
};

export default Home;

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { RouteParams } from '@/types/global';

const AskQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;

  const session = await auth();
  if (!session) return redirect('/sign-in');

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Question ID: {id}</h1>

      <div className="mt-8"></div>
    </div>
  );
};

export default AskQuestion;

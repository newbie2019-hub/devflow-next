import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import QuestionForm from '@/components/forms/QuestionForm';

const AskQuestion = async () => {
  const session = await auth();
  if (!session) return redirect('/sign-in');

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-8">
        <QuestionForm />
      </div>
    </div>
  );
};

export default AskQuestion;

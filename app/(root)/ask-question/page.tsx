import QuestionForm from '@/components/forms/QuestionForm';

const Page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-8">
        <QuestionForm />
      </div>
    </div>
  );
};

export default Page;

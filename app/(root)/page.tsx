import Link from 'next/link';

import { auth } from '@/auth';
import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilter from '@/components/filters/HomeFilter';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import { api } from '@/lib/api';
import handleError from '@/lib/handlers/error';

const test = async () => {
  try {
    return await api.users.getAll();
  } catch (error) {
    return handleError(error);
  }
};

const questions = [
  {
    _id: '1',
    title: 'How to learn React?',
    description: 'I want to learn React from scratch and build a project',
    tags: [{ _id: '1', name: 'React' }],
    author: {
      _id: '1',
      name: 'John Doe',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 10,
    answers: 5,
    views: 200,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'How to learn JavaScript?',
    description: 'I want to learn JavaScript from scratch',
    tags: [{ _id: '1', name: 'JavaScript' }],
    author: {
      _id: '1',
      name: 'John Michael',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 20,
    answers: 15,
    views: 120,
    createdAt: new Date(),
  },
  {
    _id: '3',
    title: 'Fix issue with React Router history',
    description: 'I am having an issue with React Router history',
    tags: [
      { _id: '1', name: 'JavaScript' },
      { _id: '2', name: 'React' },
    ],
    author: {
      _id: '1',
      name: 'John Michael',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 20,
    answers: 20,
    views: 290,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();
  console.log('Session: ', session);

  const { query = '', filter = '' } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    // Match query against the title
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());

    // Match filter against tags or author name, adjust logic as needed
    const matchesFilter = filter
      ? question.tags.some(
          (tag) => tag.name.toLowerCase() === filter.toLowerCase()
        ) || question.author.name.toLowerCase() === filter.toLowerCase()
      : true; // If no filter is provided, include all questions

    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          placeholder="Search questions..."
          imgSrc="/icons/search.svg"
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

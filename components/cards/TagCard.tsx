import Link from 'next/link';

import ROUTES from '@/constants/routes';
import { getDeviconClassName } from '@/lib/utils';

import { Badge } from '../ui/badge';

interface Props {
  _id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ _id, name, questions, showCount, compact }: Props) => {
  return (
    <Link
      href={ROUTES.TAGS(_id)}
      className="flex justify-between gap-2"
    >
      <Badge className="text-light400_light500 background-light800_dark300 rounded-md border-none px-4 py-2">
        <span className="flex-center block space-x-2">
          <i className={getDeviconClassName(name)}></i>
          <span>{name}</span>
        </span>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;

import Image from 'next/image';
import Link from 'next/link';

import ROUTES from '@/constants/routes';
import { getDeviconClassName } from '@/lib/utils';

import { Badge } from '../ui/badge';

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const content = (
    <>
      <Badge className="text-light400_light500 background-light800_dark300 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <span className="flex-center block space-x-2">
          <i className={getDeviconClassName(name)}></i>
          <span>{name}</span>
        </span>

        {remove && (
          <Image
            src="/icons/close.svg"
            alt="close icon"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button
        type="button"
        className="flex justify-between gap-2"
      >
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAG(_id)}
        className="flex justify-between gap-2"
      >
        {content}
      </Link>
    );
  }
};

export default TagCard;

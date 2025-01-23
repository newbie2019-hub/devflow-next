import { FilterQuery } from 'mongoose';

import { Tag } from '@/database';
import {
  PaginatedSearchParams,
  ActionResponse,
  Tag as TagType,
  ErrorResponse,
} from '@/types/global';

import action from '../handlers/action';
import handleError from '../handlers/error';
import { PaginatedSearchParamsSchema } from '../validations';

export const getTags = async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: TagType[]; isNext: boolean }>> => {
  const validatedResult = action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (+page - 1) * pageSize;
  const limit = +pageSize;

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: 'i' } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case 'popular':
      sortCriteria = { questions: -1 };
      break;
    case 'recent':
      sortCriteria = { createdAt: -1 };
      break;
    case 'oldest':
      sortCriteria = { createdAt: 1 };
      break;
    case 'name':
      sortCriteria = { name: 1 };
      break;
    default:
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: { tags, isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

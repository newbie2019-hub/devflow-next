import { ActionResponse } from '@/types/global';

import logger from '../logger';
import handleError from './error';
import { RequestError } from '../http-errors';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const { timeout = 5000, headers: customHeaders = {}, ...opt } = options;

  const controller = new AbortController();
  // Abort the request if it excees 5 seconds
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...opt,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error');

    // Abort
    if (error.name === 'AbortError') {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}

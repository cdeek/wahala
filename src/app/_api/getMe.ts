import { useQuery } from '@apollo/client';

import type { User } from '@/backend/types';
import { ME_QUERY, ME_ALL_QUERY } from '../_graphql/me';
import { useAuth } from '../_providers/Auth';

export const getMe = (args?: string) => {
  let query = ME_QUERY;
  const { token, setToken } = useAuth();

  if (args && args == 'all') query = ME_ALL_QUERY;

  const { error, loading, data } = useQuery(query, {
    variables: {token}
  });

  if (error) setToken(undefined);

  return { error, loading, data };
}


import { useQuery } from '@tanstack/react-query';
import type { Group } from '@/_service/group/group.dto';
import type { ApiError } from '@/_service/core/apiError';
import { getGroups } from '@/_service/group/groupService';

/**
 * 그룹 목록을 가져오는 TanStack Query 커스텀 훅
 */
export const useGroups = () => {
  console.log('--- 2. useGroups: useQuery를 설정합니다. ---');
  return useQuery<Group[], ApiError>({
    queryKey: ['groups_test_sad8912812'],
    queryFn: () => {
      console.log('--- 3. queryFn: getGroups()를 호출합니다. ---');
      return getGroups();
    },
    staleTime: 0,
    gcTime: 0,
    enabled: true,
  });
};
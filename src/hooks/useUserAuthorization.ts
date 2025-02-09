import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { authStart, authSuccess, authFailure } from "@/lib/features/user/slice";

export interface User {
  id: number | string;
  username?: string | undefined;
  firstName: string;
}

export interface UseUserAuthorizationReturn {
  id: number | string | null;
  loading: boolean;
  error: string | null;
  isContentLoaded: boolean;
}


export const useUserAuthorization = (
  user: User | null,
  serverUrl: string
): UseUserAuthorizationReturn => {
  const dispatch = useAppDispatch();

  const { id, loading, error } = useAppSelector((state) => state.user);

  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const authorizeUser = useCallback(
    async (signal?: AbortSignal) => {
      if (!user) return;
      dispatch(authStart());

      try {
        const response = await fetch(`${serverUrl}/api/user-controller/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            username: user.username ? user.username : "без username",
            first_name: user.firstName,
          }),
          signal,
        });

        if (!response.ok) {
          throw new Error("Failed to authorize user");
        }

        const data = await response.json();
        dispatch(authSuccess(data.id));
      } catch (err: any) {
        if (err.name !== "AbortError") {
          dispatch(authFailure(err.message));
        }
      }
    },
    [dispatch, serverUrl, user]
  );

  useEffect(() => {
    if (!user) return;

    if (id) {
      setIsContentLoaded(true);
      return;
    }

    const controller = new AbortController();
    authorizeUser(controller.signal).finally(() => {
      setIsContentLoaded(true);
    });

    return () => {
      controller.abort();
    };
  }, [user, id, authorizeUser]);

  return { id, loading, error, isContentLoaded };
};

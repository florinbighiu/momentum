import { useAuth } from "@clerk/clerk-react";

export const useGetUserId = () => {
  const user = useAuth();

  const userId = user?.userId;

  return userId;
};

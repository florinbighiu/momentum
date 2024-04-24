import { useAuth } from "@clerk/clerk-react";

export const useGetUserId = () => {
  const user = useAuth();

  const { userId } = user;

  return userId;
};

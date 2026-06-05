import { useAuth } from "@clerk/clerk-react";

export const useGetUserId = () => {
  const { userId } = useAuth();
  return userId ?? null;
};


import { useAuth } from "@clerk/clerk-react";

export const useGetUserId = () => {
  const user = useAuth();

  const { userId } = user;

  if (!userId) {
    throw new Error("User ID not found");
  }

  return userId;
};

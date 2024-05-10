import { useAuth } from "@clerk/clerk-react";

export const useGetUserOrgId = () => {
  const user = useAuth();

  const { userOrgId } = user;

  return userOrgId;
};

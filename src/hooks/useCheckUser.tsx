import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/auth";
import { useEffect } from "react";

export const useCheckUser = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!!user && !isLoading) {
      if (user.role !== "company") {
        dispatch(logout());
      }
    }
  }, [user]);
};

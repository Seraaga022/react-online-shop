import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  checkEmailResT,
  fileUploadReqT,
  fileUploadResT,
  getTokenReqT,
  userReqT,
} from "../utils/types/Auth";
import { tokensT, UserT } from "../state management/User/UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state management/store";
import { useNavigate } from "react-router-dom";

export const useCheckEmail = (setTheRes?: (res: checkEmailResT) => void) => {
  return useMutation<checkEmailResT, Error, string>({
    mutationFn: async (email: string) =>
      await axios
        .post<checkEmailResT>(
          `${import.meta.env.VITE_BASE_URL}/users/is-available`,
          { email }
        )
        .then((res) => res.data),
    onSuccess: (res) => setTheRes && setTheRes(res),
  });
};

export const useUploadFile = (setUploadRes?: (res: fileUploadResT) => void) => {
  return useMutation<fileUploadResT, Error, fileUploadReqT>({
    mutationFn: async (file: fileUploadReqT) =>
      await axios
        .post<fileUploadResT>(
          `${import.meta.env.VITE_BASE_URL}/files/upload`,
          {
            file,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => res.data),
    onSuccess: (res) => setUploadRes && setUploadRes(res),
  });
};

export const useLoginUser = (AuthenticateUser: (res: UserT) => void) => {
  return useMutation<UserT, Error, tokensT>({
    mutationFn: async (tokens: tokensT) =>
      await axios
        .get<UserT>(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        })
        .then((res) => res.data),
    onSuccess: (res) => AuthenticateUser(res), // this function authenticates the user
  });
};

export const useGetTokens = (setAccessTokenCookie: (res: tokensT) => void) => {
  return useMutation<tokensT, Error, getTokenReqT>({
    mutationFn: async (user: getTokenReqT) =>
      await axios
        .post<tokensT>(`${import.meta.env.VITE_BASE_URL}/auth/login`, user)
        .then((res) => res.data),
    onSuccess: (res) => setAccessTokenCookie(res),
  });
};

export const useRegisterUser = (submitRequest: (res: UserT) => void) => {
  const navigate = useNavigate();
  return useMutation<UserT, Error, userReqT>({
    mutationFn: async (user: userReqT) =>
      await axios
        .post<UserT>(`${import.meta.env.VITE_BASE_URL}/users`, user)
        .then((res) => res.data),
    onSuccess: (res) => {
      submitRequest(res);
      setTimeout(() => navigate("/login"), 1000);
    },
  });
};

export const useUpdateUser = <T>(setUpdatedUser: (res: UserT) => void) => {
  const user = useSelector((state: RootState) => state.User);
  return useMutation<UserT, Error, T>({
    mutationFn: async (updatedEntity: T) =>
      await axios
        .put<UserT>(
          `${import.meta.env.VITE_BASE_URL}/users/${user.id}`,
          updatedEntity,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => res.data),
    onSuccess: (res) => setUpdatedUser(res),
  });
};

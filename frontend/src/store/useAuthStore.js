import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningup: false,
  isSigningin: false,
  isSigningOut: false,
  isCheckingAuth: false,
  isUpdatingAccount: false,
  isGoogleSignIn: false,
  signUp: async (formData) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post("/auths/signup", formData);
      set({ authUser: res.data });
      return true;
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.log(error.response.data.message);
      }
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isSigningup: false });
    }
  },
  signIn: async (formData) => {
    set({ isSigningin: true });
    try {
      const res = await axiosInstance.post("/auths/signin", formData);
      set({ authUser: res.data });
      return true;
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.log(error.response.data.message);
      }
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isSigningin: false });
    }
  },
  signOut: async () => {
    set({ isSigningOut: true });
    try {
      await axiosInstance.post("/auths/signout");
      await get().checkAuth();
      return true;
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.log(error.response.data.message);
      }
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isSigningOut: false });
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auths/check-auth");
      if (res) {
        set({ authUser: res.data });
      }
    } catch (error) {
      set({ authUser: null });
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.log(error.response?.data?.message);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  googleSignIn: async (formData) => {
    set({ isGoogleSignIn: true });
    try {
      const res = await axiosInstance.post("/auths/google-login", formData);
      set({ authUser: res.data });
      return true;
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.log(error.response.data.message);
      }
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isGoogleSignIn: false });
    }
  },
  updateAccount: async (formData) => {
    set({ isUpdatingAccount: true });
    try {
      const res = await axiosInstance.put("/auths/update-account", formData);
      set({ authUser: res.data });
      return true;
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.log(error.response.data.message);
      }
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isUpdatingAccount: false });
    }
  },
  checkUserExist: async (email) => {
    try {
      const res = await axiosInstance.post(`/auths/check-user-exist`, {
        email,
      });
      if (res.data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.log(error.response.data.message);
      }
      return false;
    }
  },
}));

import { create } from "zustand";
import { newAxiosInstance } from "../utils/newAxiosInstance";
import toast from "react-hot-toast";

export const useNewAuthStore = create((set, get) => ({
  authUser: null,
  token: localStorage.getItem("authUser") || null,
  setToken: (v) => {
    set({ token: v });
  },
  isSigningup: false,
  isSigningin: false,
  isSigningOut: false,
  isCheckingAuth: false,
  isUpdatingAccount: false,
  isGoogleSignIn: false,
  signUp: async (formData) => {
    set({ isSigningup: true });
    try {
      const res = await newAxiosInstance.post("/register", formData);
      set({ authUser: res.data.customer });
      localStorage.setItem("authUser", res.data.token);
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
      const res = await newAxiosInstance.post("/login", formData);
      set({ authUser: res.data.user });
      localStorage.setItem("authUser", res.data.token);
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
      await newAxiosInstance.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${get().token}` },
        }
      );
      localStorage.removeItem("authUser");
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
      const res = await newAxiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${get().token}` },
      });
      if (res) {
        set({ authUser: res.data.user });
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
      const res = await newAxiosInstance.post("/register", formData); // Adjusted endpoint for Google
      set({ authUser: res.data.customer });
      localStorage.setItem("authUser", res.data.token);
      return true;
    } catch (error) {
      try {
        const loginRes = await newAxiosInstance.post("/login", formData); 
        console.log(loginRes);
        set({ authUser: loginRes.data.customer });
        localStorage.setItem("authUser", loginRes.data.token);
        toast.success("Logged in with Google successfully");
        return true;
      } catch (loginError) {
        try {
          const loginRes = await newAxiosInstance.post("/login", formData); 
          set({ authUser: loginRes.data.customer });
          localStorage.setItem("authUser", loginRes.data.token);
          toast.success("Logged in with Google successfully");
          return true;
        } catch (loginError) {
          if (import.meta.env.VITE_NODE_ENV === "development") {
            console.log("Login failed:", loginError.response?.data?.message);
          }
          toast.error(loginError.response?.data?.message || "Failed to sign in with Google");
          set({ isGoogleSignIn: false });
          return false;
        }
      }
    }
  },
  updateAccount: async (formData) => {
    set({ isUpdatingAccount: true });
    try {
      const res = await newAxiosInstance.put("/user", formData, {
        headers: { Authorization: `Bearer ${get().token}` },
      });
      set({ authUser: res.data.user });
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
  checkUserExist: async () => {
    try {
      const res = await newAxiosInstance.get(`/user`, {
        headers: { Authorization: `Bearer ${get().token}` },
      });
      if (res.data.user) {
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

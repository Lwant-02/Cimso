import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import { newAxiosInstance } from "../utils/newAxiosInstance";
import { useNewAuthStore } from "./useNewAuthStore";

export const useNewBookingStore = create((set, get) => ({
  isGettingCourse: false,
  isGettingCourses: false,
  hole: null,
  courses: [],
  course: null,
  packageType: {},
  timeAndPrice: {},
  dateAndTime: "",
  golfer: null,
  total: null,
  bookings: [],
  cancelBookings: [],
  userBookings: [],
  isCancelBooking: false,
  isGettingBookings: false,
  isCreatingBooking: false,
  packageId: null,
  packages: [],
  getPackages: async () => {
    try {
      const res = await newAxiosInstance.get("/packages");
      if (res.status === 200) {
        set({ packages: res.data || [] });
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("Error in getPackages:", error);
      }
      set({ packages: [] });
    }
  },
  setPackageId: (v) => {
    set({ packageId: v });
  },
  createBooking: async (data) => {
    try {
      set({ isCreatingBooking: true });
      const token = useNewAuthStore.getState().token;
      const user = useNewAuthStore.getState().authUser;

      const res = await newAxiosInstance.post("/bookings", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        set({ bookings: res.data });
      }
      get().getBookings(user.id);
      return res.data;
    } catch (error) {
      console.log("Error in createBooking:", error.message);
      return null;
    } finally {
      set({ isCreatingBooking: false });
    }
  },
  getBookings: async (userId) => {
    set({ isGettingBookings: true });
    try {
      const token = useNewAuthStore.getState().token;
      const res = await newAxiosInstance.get(`/bookings/${userId}/customer`, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      if (res.status == 200) {
        set({ bookings: res.data || [] });
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("Error in getBookings:", error.message);
      }
      set({ bookings: [] });
    } finally {
      set({ isGettingBookings: false });
    }
  },
  setTotal: (v) => {
    set({ total: v });
  },
  setGolfer: (v) => {
    set({ golfer: Number(v) });
  },
  setDateAndTime: (date) => {
    set({ dateAndTime: date });
  },
  getUpdateTimeAndPrice: () => {},
  setTimeAndPrice: (data) => {
    set({ timeAndPrice: data });
  },
  setPackage: (data) => {
    set({ packageType: data });
  },

  setHole: (v) => {
    set({ hole: v });
  },
  getCourses: async () => {
    set({ isGettingCourses: true });
    try {
      const res = await newAxiosInstance.get("/courses");
      if (res) {
        set({ courses: res.data });
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("Error in getCourses:", error.message);
      }
    } finally {
      set({ isGettingCourses: false });
    }
  },
  getCourse: async (id) => {
    set({ isGettingCourse: true });
    try {
      const res = await newAxiosInstance.get(`/courses/${id}`);
      if (res) {
        set({ course: res.data });
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("Error in getCourse:", error.message);
      }
    } finally {
      set({ isGettingCourse: false });
    }
  },
  cancelBooking: async (bookingId) => {
    set({ isCancelBooking: true });
    const user = useNewAuthStore.getState().authUser;
    const token = useNewAuthStore.getState().token;
    try {
      await newAxiosInstance.get(`/bookings/${bookingId}/cancel`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      get().getBookings(user.id);
      return true;
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("Error in cancelBooking:", error.message);
      }
      return false;
    } finally {
      set({ isCancelBooking: false });
    }
  },
  networkUsers: null,
  getNetWorkUser: async () => {
    try {
      const token = useNewAuthStore.getState().token;
      const res = await newAxiosInstance.get("/network", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ networkUsers: res.data });
    } catch (error) {
      console.log("Error in getNetWorkUser:", error.message);
    }
  },
}));

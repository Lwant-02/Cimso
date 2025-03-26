import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import { newAxiosInstance } from "../utils/newAxiosInstance";
import { useNewAuthStore } from "./useNewAuthStore";

export const useUtilsStore = create((set, get) => ({
  closeDrawer: () => {
    const drawerCheckbox = document.getElementById("my-drawer-4");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  },
  openModal: () => {
    document.getElementById("my_modal_1").showModal();
  },
  closeModal: () => {
    document.getElementById("my_modal_1").close();
  },
  activeTab: localStorage.getItem("activeTab") || "home",
  setActiveTab: (tab) => {
    localStorage.setItem("activeTab", tab);
    set({ activeTab: tab });
  },
  input: "",
  chatMessage: [],
  isSendingMail: false,
  setInput: (input) => set({ input }),
  clearChat: () => set({ input: "", botResponse: "", chatMessage: [] }),
  sentMessage: async (input) => {
    try {
      // Store user message
      set((state) => ({
        chatMessage: [
          ...state.chatMessage,
          { role: "user", parts: [{ text: input }] },
        ],
      }));

      const formattedHistory = get().chatMessage.map((entry) => ({
        role: entry.role,
        parts: entry.parts,
      }));

      // Send request to chatbot API
      const res = await axiosInstance.post("/chat/response", {
        prompt: input,
        history: formattedHistory,
      });

      // Store bot response
      set((state) => ({
        chatMessage: [
          ...state.chatMessage,
          { role: "model", parts: [{ text: res.data.response || res.data }] },
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  sentConfirmEmail: async (formData) => {
    try {
      // Send request to email confirmation API
      await axiosInstance.post("/emails/send-email-confirm", formData);
    } catch (error) {
      console.log(error);
    }
  },
  sentCancelEmail: async (formData) => {
    try {
      // Send request to email cancellation API
      await axiosInstance.post("/emails/send-email-cancel", formData);
    } catch (error) {
      console.log(error);
    }
  },
  sentWelcomeEmail: async (formData) => {
    try {
      await axiosInstance.post("/emails/send-email-welcome", formData);
    } catch (error) {
      console.log(error);
    }
  },
  setTournamentConfirm: async (formData) => {
    try {
      set((state) => ({ ...state, isSendingMail: true }));
      await axiosInstance.post("/emails/send-email-tournament", formData);
    } catch (error) {
      console.log(error);
    } finally {
      set((state) => ({ ...state, isSendingMail: false }));
    }
  },
  submitTournament: async (formData) => {
    try {
      const token = useNewAuthStore.getState().token;
      cosnt = await newAxiosInstance.post("/attendee/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));

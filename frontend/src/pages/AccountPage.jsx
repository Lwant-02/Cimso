import { useEffect, useState } from "react";
import { Profile } from "../components/UI/Profile";
import { useNewAuthStore } from "../store/useNewAuthStore";
import { Community } from "../components/UI/Community";
import { useNewBookingStore } from "../store/useNewBookingStore";

export const AccountPage = () => {
  const { authUser } = useNewAuthStore();
  const { getNetWorkUser, networkUsers } = useNewBookingStore();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    getNetWorkUser();
  }, []);

  return (
    <div className="min-h-screen  sm:px-0 px-5 flex flex-col items-start justify-start gap-2 py-8 sm:w-5/6 w-auto mx-auto">
      <p className="font-bold sm:text-2xl text-lg text-accent-color">
        Hi {authUser.full_name} 👋🏻
      </p>
      <div role="tablist" className="tabs tabs-border ">
        <a
          role="tab"
          className={`tab ${
            activeTab === "profile" && "tab-active"
          } font-semibold`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </a>
        <a
          role="tab"
          className={`tab ${
            activeTab === "community" && "tab-active"
          } font-semibold`}
          onClick={() => setActiveTab("community")}
        >
          Community
        </a>
      </div>
      <div className="w-full h-auto flex justify-center items-center">
        {activeTab === "profile" && <Profile />}
        {activeTab === "community" && <Community />}
      </div>
    </div>
  );
};

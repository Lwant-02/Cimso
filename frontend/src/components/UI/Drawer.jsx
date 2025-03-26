import React from "react";
import { AlignRight, ArrowRight, LogOut, X } from "lucide-react";
import { Tab } from "./Tab";
import { useUtilsStore } from "../../store/useUtilsStore";
import { CustomButton } from "./CustomButton";
import { AuthIcon } from "../Home/AuthIcons";
import { useAuthStore } from "../../store/useAuthStore";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const Drawer = () => {
  // const { authUser, signOut } = useAuthStore();
  const { authUser, signOut } = useNewAuthStore();
  const { closeDrawer } = useUtilsStore();
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button flex w-full justify-end"
        >
          <div className="btn btn-circle bg-[#CAE0BC]/50">
            <AlignRight className="size-7 swap-off fill-current" />
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="menu bg-primary-color text-base-content min-h-full w-72 flex flex-col gap-3 p-4">
          <div className="flex justify-end">
            <div
              className="rounded-full p-1 border border-base-content/10 cursor-pointer hover:bg-accent-color hover:text-primary-color transition-colors duration-300"
              onClick={closeDrawer}
            >
              <X className="size-5" />
            </div>
          </div>
          {authUser && <AuthIcon />}
          <Tab />
          {authUser ? (
            <CustomButton
              buttonName="Sign Out"
              icon={<LogOut className="size-5" />}
              type="secondaryButton"
              style="w-full mt-3"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            />
          ) : (
            <CustomButton
              buttonName="Sign In"
              icon={<ArrowRight className="size-5" />}
              url="/signin"
              type="secondaryButton"
              style="w-full mt-3"
              onClick={closeDrawer()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

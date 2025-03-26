import React from "react";
import { motion } from "framer-motion";
import { CustomButton } from "./CustomButton";
import { ArrowRight } from "lucide-react";
import { Tab } from "./Tab";
import { MainLogo } from "../../utils/constant";
import { AuthIcon } from "../Home/AuthIcons";
import { Drawer } from "./Drawer";
// import { useAuthStore } from "../../store/useAuthStore";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const Navbar = () => {
  // const { authUser } = useAuthStore();
  const { authUser } = useNewAuthStore();

  return (
    <motion.nav
      className={`z-20 w-full flex justify-center h-20 items-center top-0 sticky border-b border-base-content/20 shadow bg-primary-color`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between sm:w-5/6 w-6/6 sm:px-0 px-5 h-full items-center">
        <div className=" sm:w-1/6 w-24 flex justify-center items-center ">
          <img src={MainLogo} alt="logo" />
        </div>
        <div className="flex justify-center items-center flex-1 ">
          <div className="sm:flex hidden items-center justify-end  w-4/6 ">
            <Tab />
          </div>
          <div className="justify-end items-end gap-2 flex-1 sm:flex hidden ">
            {authUser ? (
              <AuthIcon />
            ) : (
              <CustomButton
                buttonName="Sign In"
                icon={<ArrowRight className="size-5" />}
                url="/signin"
                type="secondaryButton"
              />
            )}
          </div>
          <div className="sm:hidden flex w-full">
            <Drawer />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

import React from "react";
import { Bot as BotIcon } from "lucide-react";

export const Bot = ({ setShowChat }) => {
  return (
    <div
      className="bg-white tooltip tooltip-left fixed z-10 bottom-16 right-5 border border-accent-content cursor-pointer sm:size-12 size-10 rounded-full flex justify-center items-center animate-bounce hover:bg-accent-color hover:text-primary-color transition-colors duration-300"
      onClick={() => setShowChat(true)}
    >
      <BotIcon className="size-7" />
      <div className="tooltip-content">
        <div className=" text-orange-400 text-sm font-semibold">
          Hey, how can I help you today?
        </div>
      </div>
    </div>
  );
};

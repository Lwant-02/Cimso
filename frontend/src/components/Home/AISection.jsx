import { ArrowRight, Award, ChartNoAxesCombined, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { CustomButton } from "../UI/CustomButton";
import { AI_Logo } from "../../utils/constant";

export const AISection = ({ setShowChat }) => {
  return (
    <motion.div
      className="flex w-auto bg-white h-auto rounded-lg shadow-lg p-5 gap-8 flex-col sm:flex-row border border-base-content/10 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sm:w-3/6 w-full sm:flex-row flex-col justify-start items-start gap-3">
        <h1 className="text-accent-color text-2xl font-bold">
          Your Personal AI Golf Assistant
        </h1>
        <p className="text-sm text-justify mt-2">
          Master your game with real-time tips, course insights, and swing
          analysis—all powered by AI. Whether you're a beginner or a seasoned
          pro, our intelligent chatbot is here to help you improve, strategize,
          and enjoy every round.
        </p>
        <h3 className="text-accent-color text-lg font-semibold">
          Ask anything.Get instant answers.Play smarter
        </h3>
        <div className="flex flex-col gap-2 justify-start items-start ">
          <span className="flex justify-center items-center gap-1">
            <Award className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
            <p className="text-sm ">Course Recommendations</p>
          </span>
          <span className="flex justify-center items-center gap-1">
            <Zap className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
            <p className="text-sm ">Swing Tips</p>
          </span>
          <span className="flex justify-center items-center gap-1">
            <ChartNoAxesCombined className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
            <p className="text-sm ">Performance insights</p>
          </span>
        </div>
        <CustomButton
          buttonName="Try it now"
          icon={<ArrowRight />}
          type="secondaryButton"
          onClick={() => setShowChat(true)}
          style="sm:mb-0 mb-5 mt-3 w-32"
        />
      </div>
      <div className="sm:flex-1 justify-center items-center flex ">
        <img
          src={AI_Logo}
          alt="logo"
          className="size-80 object-cover rounded-lg"
        />
      </div>
    </motion.div>
  );
};

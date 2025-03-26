import { Search } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

export const HomeSearchField = () => {
  const navigate = useNavigate();
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"; // 1M+
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"; // 100K+
    return num.toString();
  };

  const AnimatedCounter = ({ end }) => {
    return (
      <CountUp
        start={0}
        end={end}
        duration={2}
        formattingFn={formatNumber} // Format numbers dynamically
      />
    );
  };

  return (
    <div className="w-full flex justify-center items-center mt-5 flex-col gap-8 ">
      <div className="w-full flex justify-center items-center gap-2 ">
        <label
          className="input input-bordered focus:outline-none focus:ring-0 sm:w-3/6 flex justify-center items-center"
          onClick={() => navigate("/search")}
        >
          <Search className="size-5" />
          <input
            type="search"
            required
            placeholder="Where to golf?"
            name="home-search"
          />
        </label>
      </div>
      <div className="sm:w-3/6 w-full flex gap-10 justify-between items-center">
        <span>
          <p className="sm:text-2xl text-primary-color font-semibold">
            <AnimatedCounter end={456} />
          </p>
          <p className="text-primary-color sm:text-lg text-sm">Golf courses</p>
        </span>
        <span>
          <p className="sm:text-2xl text-primary-color font-semibold">
            <AnimatedCounter end={1000000} />
          </p>
          <p className="text-primary-color sm:text-lg text-sm">
            Green fee booked
          </p>
        </span>
        <span>
          <p className="sm:text-2xl text-primary-color font-semibold">
            <AnimatedCounter end={100000} />
          </p>
          <p className="text-primary-color sm:text-lg text-sm">
            Registered golfers
          </p>
        </span>
      </div>
    </div>
  );
};

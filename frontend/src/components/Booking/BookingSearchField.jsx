import React from "react";
import { motion } from "framer-motion";
import { CustomButton } from "../UI/CustomButton";
import { Search } from "lucide-react";
import { useBookingStore } from "../../store/useBookingStore";

export const BookingSearchField = ({
  value,
  setSearchQuery,
  setIsSearching,
  setFilteredCourses,
  setHasSearched,
}) => {
  const { courses } = useBookingStore();
  const handleSearch = () => {
    if (!value.trim()) return;
    setHasSearched(true);
    setIsSearching(true);
    // Simulate a slight delay (e.g., 500ms) before processing
    setTimeout(() => {
      const result = courses.filter(
        (course) =>
          course.courseName.toLowerCase().includes(value.toLowerCase()) ||
          course.location.city.toLowerCase().includes(value.toLowerCase()) ||
          course.location.country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCourses(result);
      setIsSearching(false);
    }, 500);
  };
  return (
    <motion.div
      className="w-full h-full flex justify-end items-center gap-3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="input focus:outline-none focus:ring-0 focus:border-transparent rounded-xl sm:w-2/6">
        <Search className="size-5" />
        <input
          type="search"
          placeholder="Type the course name or city  "
          className="border-none sm:text-sm text-xs"
          name="booking-search"
          value={value || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
      <CustomButton
        buttonName="Search"
        type="secondaryButton"
        onClick={handleSearch}
      />
    </motion.div>
  );
};

import React from "react";
// import { useBookingStore } from "../../store/useBookingStore";
import { useNewBookingStore } from "../../store/useNewBookingStore";

export const Hole = ({ holeNumber }) => {
  // const { hole, setHole, setTimeAndPrice } = useBookingStore();
  const { hole, setHole, setTimeAndPrice } = useNewBookingStore();
  const handleCheckboxChange = () => {
    if (hole === holeNumber) {
      setHole(null);
      setTimeAndPrice({}); // Clear time and price if it's already selected
    } else {
      setHole(holeNumber);
    }
  };

  return (
    <fieldset className="fieldset p-3 bg-[#2B2B2B] border border-base-300 rounded-box w-full">
      <label className="fieldset-label text-primary-color text-sm font-semibold">
        <input
          type="checkbox"
          className="checkbox checkbox-success checkbox-sm"
          name="checkbox"
          checked={hole === holeNumber} // Checked if it's the selected hole
          onChange={handleCheckboxChange} // Handle checkbox change
          disabled={hole && hole !== holeNumber}
        />
        {holeNumber} Holes
      </label>
    </fieldset>
  );
};

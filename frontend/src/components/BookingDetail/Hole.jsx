import React from "react";
import { useNewBookingStore } from "../../store/useNewBookingStore";

export const Hole = ({ holeNumber }) => {
  const { hole, setHole, setTimeAndPrice } = useNewBookingStore();

  const isChecked = hole === holeNumber;

  const handleCheckboxChange = () => {
    if (isChecked) {
      // Optional: Allow deselection if clicked again (uncomment if desired)
      // setHole(null);
      // setTimeAndPrice({});
    } else {
      setHole(holeNumber);
      setTimeAndPrice({}); // Clear time and price when switching holes
    }
  };

  return (
    <fieldset className="fieldset p-3 bg-[#2B2B2B] border border-base-300 rounded-box w-full">
      <label className="fieldset-label text-primary-color text-sm font-semibold flex items-center gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-success checkbox-sm"
          name="checkbox"
          checked={isChecked} // Checked if it's the selected hole
          onChange={handleCheckboxChange} // Handle checkbox change
        />
        {holeNumber} Holes
      </label>
    </fieldset>
  );
};

import React, { useState } from "react";
import { CustomButton } from "./CustomButton";
import { Input } from "./Input";
import { useUtilsStore } from "../../store/useUtilsStore";
import { Spinner } from "./Spinner";

export const TournamentFormModal = ({ closeModal: closeTournamentModal }) => {
  const {
    setTournamentConfirm,
    openModal,
    isSendingMail,
    closeModal,
    submitTournament,
  } = useUtilsStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      return;
    }
    const formDataObj = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      tournamentName: "Legends Golf Championship",
      date: " 23 April, 2025",
      time: "13:00-18:00 PM",
      location: "PathumThani > Thailand",
    };
    await setTournamentConfirm(formDataObj);
    const submitData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      tournament_name: "Legends Golf Championship(2025)",
    };
    await submitTournament(submitData);
    closeTournamentModal();
    openModal();
    setTimeout(() => {
      closeModal();
      setFormData({ fullName: "", email: "", phone: "" });
    }, 5000);
  };

  return (
    <dialog id="tournament_modal" className={`modal`}>
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full justify-between items-center ">
            <h3 className="font-bold text-lg text-accent-color">Get Ready!</h3>
            <p className="font-bold text-md text-accent-color">
              For Legends Golf Championship
            </p>
          </div>
          <div className="w-full h-auto">
            <p className="py-4 text-sm font-semibold text-start">
              Please fill out your informations
            </p>

            <Input
              placeholder="Please enter your full name"
              name="Your name"
              validateMessage="Your name is required!"
              value={formData.fullName}
              required={true}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <Input
              placeholder="Please enter your email address"
              name="Your email address"
              value={formData.email}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^$"
              validateMessage="Please enter a valid email address!"
              required={true}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              placeholder="Please enter your phone number"
              name="Your phone number"
              validateMessage="Your phone number is required!"
              value={formData.phone}
              required={true}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="modal-action flex justify-center items-center gap-3">
            <CustomButton
              buttonName="Cancel"
              onClick={closeTournamentModal}
              type="primaryButton"
              style="w-1/2"
            />

            <CustomButton
              buttonName={isSendingMail ? <Spinner /> : "Submit"}
              type="submitButton"
              style="flex-1"
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

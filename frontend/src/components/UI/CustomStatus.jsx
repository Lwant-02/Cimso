import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { X } from "lucide-react";
import { useUtilsStore } from "../../store/useUtilsStore";
import { CustomButton } from "./CustomButton";

export const CustomStatus = ({
  status,
  title,
  subTitle,
  url,
  buttonTitle,
  hasButton,
  comfirmed,
  onClick,
}) => {
  const { closeModal } = useUtilsStore();
  const unsuccessfulStatus = (
    <DotLottieReact
      src="https://lottie.host/8f3fc716-a4ce-4b26-816c-0909cc8a03bf/kA4CsnYxXA.lottie"
      loop
      autoplay
    />
  );

  const successfulStatus = (
    <DotLottieReact
      src="https://lottie.host/f7c8496f-d31b-4958-8166-2e1ff2989ddf/2gDJpJFkC2.lottie"
      loop
      autoplay
    />
  );

  return (
    <dialog id="my_modal_1" className={`modal`}>
      <div className="modal-box">
        <div className="flex w-full justify-between items-center ">
          <h3 className="font-bold text-lg">{title}</h3>
          {hasButton && (
            <button
              className="modal-close cursor-pointer p-1 rounded-full hover:bg-accent-color/50 hover:text-primary-color transition-colors duration-300"
              onClick={() => closeModal()}
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="w-full h-auto">
          {status === "success" ? successfulStatus : unsuccessfulStatus}
          <p className="py-4 text-sm font-semibold text-center">{subTitle}</p>
        </div>
        {hasButton && (
          <div className="modal-action flex justify-end items-center gap-3">
            <CustomButton
              buttonName="Cancel"
              onClick={() => closeModal()}
              type="primaryButton"
            />
            <CustomButton
              buttonName={buttonTitle}
              url={url}
              type="secondaryButton"
            />
          </div>
        )}
        {comfirmed && (
          <div className="modal-action flex justify-end items-center gap-3">
            <CustomButton
              buttonName="Cancel"
              onClick={() => closeModal()}
              type="primaryButton"
            />
            <CustomButton
              buttonName={buttonTitle}
              onClick={onClick}
              type="submitButton"
            />
          </div>
        )}
      </div>
    </dialog>
  );
};

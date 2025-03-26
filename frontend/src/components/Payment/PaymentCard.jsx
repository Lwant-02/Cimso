import VisaLogo from "../../assets/svg/visa.svg";

export const PaymentCard = ({ formData, setFormData }) => {
  return (
    <div className="w-full bg-white rounded-lg p-3 flex gap-2 justify-start items-start border border-base-content/10 shadow-md flex-col pb-5">
      <p className="text-lg font-semibold">Payment Detail</p>
      <p className="text-xs">
        Please fill out the form below.Enter your card account detail.
      </p>
      <div className="flex flex-col w-full gap-3 sm:justify-start sm:items-start justify-between border-t border-base-content/10 pt-2">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <p className="text-sm font-semibold">Card Number</p>
          <div className="relative w-full">
            <input
              type="password"
              placeholder="****_****_****_****"
              className="input w-full pr-14 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              name="card-number"
              value={formData.cardNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
            />
            <img
              src={VisaLogo}
              alt="Visa Logo"
              className="size-11 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className=" flex sm:flex-row flex-col  justify-between items-center w-full gap-2">
          <div className="sm:w-1/2 w-full flex flex-col gap-1">
            <p className="text-sm font-semibold">Expire Date</p>
            <input
              type="password"
              className="input w-full pr-14 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              placeholder="MM/YY"
              name="date"
              value={formData.expiryDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
            />
          </div>
          <div className="sm:flex-1 w-full flex flex-col gap-1">
            <p className="text-sm font-semibold">CVC/CVV</p>
            <input
              type="password"
              className="input w-full pr-14 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              placeholder="***"
              name="cvc"
              value={formData.cvc || ""}
              onChange={(e) =>
                setFormData({ ...formData, cvc: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

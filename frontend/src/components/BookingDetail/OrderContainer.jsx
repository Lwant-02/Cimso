import React, { useState , useEffect } from "react";
import { CustomButton } from "../UI/CustomButton";
import { ShoppingCart } from "lucide-react";
import { SummaryInfo } from "../Payment/SummaryInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingStore } from "../../store/useBookingStore";
// import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useNewAuthStore } from "../../store/useNewAuthStore";
import { useNewBookingStore } from "../../store/useNewBookingStore";
import { useUtilsStore } from "../../store/useUtilsStore";

export const OrderContainer = () => {
  // const { authUser } = useAuthStore();
  const { authUser } = useNewAuthStore();
  const [coupon, setCoupon] = useState("");
  // const { packageType, hole, timeAndPrice, setGolfer, golfer } =
  //   useBookingStore();
  const { packageType, hole, timeAndPrice, setGolfer, golfer } =
    useNewBookingStore();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { setFinalPrice, setCouponDiscountPrice } = useUtilsStore();

  const handleBooknow = () => {
    if (!hole || !timeAndPrice.time || !timeAndPrice.price) {
      toast.error("You must select Hole and Tee Time first!");
      return;
    }
    if (!golfer) {
      toast.error("You must fill the number of golfer!");
      return;
    }
    navigate(`/booking/check-out/${courseId}`);
  };

  const calculateTotalPrice = () => {
    if (packageType.price && timeAndPrice.price && golfer) {
      return (
        Number(packageType.price) + Number(timeAndPrice.price) * Number(golfer)
      );
    }
    return (
      Number(packageType.price) ||
      Number(timeAndPrice.price) * Number(golfer) ||
      0
    );
  };
  const totalPrice = calculateTotalPrice();

  const calulateCouponDiscount = () => {
    const discount = totalPrice * (Number(coupon.discount_value) / 100);
    return discount || 0;
  };
  console.log((coupon.discount_value / 100) * totalPrice);

  const couponDiscount = calulateCouponDiscount();
  const finalPrice = couponDiscount ? totalPrice - couponDiscount : totalPrice;

  useEffect(() => {
    setFinalPrice(finalPrice);
    setCouponDiscountPrice(couponDiscount);
  }, [finalPrice, couponDiscount, setFinalPrice, setCouponDiscountPrice]);

  return (
    <div className="sm:w-96 flex flex-col justify-start items-start bg-primary-color rounded-xl overflow-hidden shadow-md h-auto border border-base-content/10">
      <h1 className="text-primary-color text-xl font-bold h-14 bg-accent-color w-full flex justify-center items-center">
        Book Your Teee Times
      </h1>
      <div className="w-full h-auto flex flex-col">
        <div className="flex justify-between items-center px-3">
          <div className="flex w-full flex-col">
            <div className="divider divider-start text-sm text-accent-color">
              Information
            </div>
          </div>
        </div>
        <div className="px-3 w-full flex flex-col gap-2">
          <SummaryInfo name="Name" value={authUser.full_name} />
          <SummaryInfo name="Email Address" value={authUser.email} />
          <SummaryInfo name="Hole" value={hole || "-"} />
          <SummaryInfo
            name="Price per session"
            value={timeAndPrice.price || "-"}
          />
          <SummaryInfo name="Package name" value={packageType.title || "-"} />
          <SummaryInfo name="Package price" value={packageType.price || "-"} />

          <select
            className="select w-full"
            value={coupon?.code || ""}
            onChange={(e) => {
              const selectedCoupon = authUser.coupons.find(
                (c) => c.code === e.target.value
              );
              setCoupon(selectedCoupon); // Store full object
            }}
          >
            <option disabled value="">
              Select a coupon
            </option>
            {authUser.coupons.map((item, index) => (
              <option key={index} value={item.code}>
                {item.code}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Type the number of Golfer"
            className="input  w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-color focus:border-transparent"
            name="golfer"
            value={golfer || ""}
            onChange={(e) => setGolfer(e.target.value)}
            required
          />
          <p className="text-xs opacity-45">
            Note:The minimum number of golfer is 2 persons/group
          </p>
        </div>
        <div className="flex flex-col gap-3 px-3 w-full mt-2 pb-5">
          <span className="flex justify-between">
            <p className="text-base font-semibold">Coupons Discount </p>
            <p className="text-base font-semibold">
              {!couponDiscount ? "฿0" : `฿${couponDiscount}`}
            </p>
          </span>
          <span className="flex justify-between">
            <p className="text-base font-semibold">Total</p>
            <p className="text-base font-semibold">฿{!finalPrice ? "0" : `${finalPrice}`}</p>
          </span>
          <CustomButton
            buttonName="Book Now"
            icon={<ShoppingCart />}
            onClick={handleBooknow}
            type="submitButton"
          />
        </div>
      </div>
    </div>
  );
};

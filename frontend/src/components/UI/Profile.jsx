import React, { useRef, useState , useEffect } from "react";
import { motion } from "framer-motion";
import { ImagePicker } from "./ImagePicker";
import { LogOut, Mail, Phone, UserRound, X, Tickets } from "lucide-react";
import { Input } from "./Input";
import { CustomButton } from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { useNewAuthStore } from "../../store/useNewAuthStore";
import toast from "react-hot-toast";

export const Profile = () => {
  const { authUser, updateAccount, signOut , coupon , checkAuth } = useNewAuthStore();

  useEffect(() => {
    if (!coupon) {  
      checkAuth();
    }
  }, [checkAuth, coupon]);

  const [formData, setFormData] = useState({
    full_name: authUser.full_name || "",
    email: authUser.email || "",
    phone: authUser.phone || "",
    profile_pic: authUser.profile_pic || "",
    facebook_url: authUser.facebook_url || "",
    x_url: authUser.x_url || "",
    linkedin_url: authUser.linkedin_url || "",
    bio: authUser.bio || "",
  });

  const fileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAlreadyPicked, setIsAlreadyPicked] = useState(false);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    const isSuccess = await updateAccount(formData);
    if (!isSuccess) {
      return;
    } else {
      toast.success("Account updated successfully.");
      setIsAlreadyPicked(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, profile_pic: "" });
  };
  const navigate = useNavigate();
  const defaultUrl =
    "https://res.cloudinary.com/dt28nxrrx/image/upload/v1738487430/vector-flat-illustration-grayscale-avatar-600nw-2264922221_vltchf.webp";
  return (
    <motion.form
      className="bg-white/90 shadow-lg sm:w-4/6 w-full h-auto rounded-xl p-7  flex flex-col justify-start items-center gap-3 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleUpdateAccount}
    >
      <div className="w-full flex justify-center items-center gap-3 flex-col ">
        <div className="flex justify-end w-full item-end">
          <CustomButton
            buttonName="Sign Out"
            icon={<LogOut className="size-5" />}
            type="secondaryButton"
            style="btn-sm sm:mb-0 mb-5"
            textStyle="sm:flex hidden"
            onClick={(e) => {
              e.preventDefault();
              signOut();
              navigate("/");
            }}
          />
        </div>
        <div className="avatar relative">
          <div className="ring-primary ring-offset-base-100 sm:w-32 w-28 rounded-full ring ring-offset-2">
            <img
              src={formData.profile_pic || defaultUrl}
              alt={formData.full_name}
            />
          </div>
          <ImagePicker
            profilePic={formData.profile_pic}
            fileRef={fileRef}
            setIsUploading={setIsUploading}
            setFormData={setFormData}
            isPicked={setIsAlreadyPicked}
          />
          {isAlreadyPicked && (
            <div
              className="absolute top-0 -right-8 bg-primary-color rounded-full p-1 border border-base-content/10 hover:bg-secondary-color hover:text-white transition-colors duration-300 cursor-pointer"
              onClick={handleRemoveImage}
            >
              <X className="sm:size-5 size-4" />
            </div>
          )}
        </div>
        <p className="text-base font-semibold opacity-50">
          {authUser.bio ? authUser.bio : ""}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:w-3/6 w-full h-auto ">
        <Input
          placeholder="Your bio"
          name="Your Bio"
          value={formData.bio || ""}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <Input
          placeholder="Your name"
          name="Your Name"
          value={formData.full_name || ""}
          icon={<UserRound className="size-5" />}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
        />
        <Input
          placeholder="Your email"
          name="Email Address"
          value={formData.email || ""}
          icon={<Mail className="size-5" />}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          placeholder="Your phone number"
          name="Phone Number"
          value={formData.phone || ""}
          icon={<Phone className="size-5" />}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          placeholder="Your Facebook URL"
          name="Facebook URL"
          value={formData.facebook_url || ""}
          onChange={(e) =>
            setFormData({ ...formData, facebook_url: e.target.value })
          }
        />
        <Input
          placeholder="Your LinkedIn URL"
          name="LinkedIn URL"
          value={formData.linkedin_url || ""}
          onChange={(e) =>
            setFormData({ ...formData, linkedin_url: e.target.value })
          }
        />
        <Input
          placeholder="Your X URL"
          name="X URL"
          value={formData.x_url || ""}
          onChange={(e) => setFormData({ ...formData, x_url: e.target.value })}
        />

        <div className="w-full mb-5">
          <p className="text-sm font-medium text-gray-600 mb-2">Your Coupons</p>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200 rounded-lg overflow-hidden shadow-sm">
            {coupon?.length === 0 ? (
              <div className="flex items-center gap-2 p-3 text-gray-500">
                <Tickets className="size-5 text-amber-400" />
                <span>No coupons available</span>
              </div>
            ) : (
                <div className="divide-y divide-amber-100">
                  {coupon?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 hover:bg-amber-50/50 transition-colors"
                    >
                      <div className="bg-amber-100 p-2 rounded-full">
                        <Tickets className="size-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.code || "COUPON CODE"}
                        </p>
                        {item.discount && (
                          <p className="text-xs text-amber-600 mt-1">
                            {item.discount}% OFF
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
          </div>
        </div>
        <CustomButton buttonName="Save Changes" type="submitButton" />
      </div>
    </motion.form>
  );
};

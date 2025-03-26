import { useState } from "react";
import { Input } from "../UI/Input";
import { ArrowRight, Lock, Mail, Phone, UserRound } from "lucide-react";
import { CustomButton } from "../UI/CustomButton";
import { Divider } from "../UI/Divider";
import GoogleLogin from "../UI/GoogleLogin";
import { FormLink } from "../UI/FormLink";
// import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useUtilsStore } from "../../store/useUtilsStore";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const SignupForm = () => {
  // const { signUp } = useAuthStore();
  const { signUp } = useNewAuthStore();
  const { sentWelcomeEmail } = useUtilsStore();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      return;
    }
    const isSuccess = await signUp(formData);
    if (!isSuccess) {
      return;
    } else {
      await sentWelcomeEmail({
        userName: formData.full_name,
        email: formData.email,
      });
      navigate("/");
    }
  };

  return (
    <form
      className="w-full flex flex-col justify-start items-start "
      onSubmit={handleSubmit}
    >
      <Input
        name="Your Name"
        placeholder="Enter your name"
        icon={<UserRound className="size-5" />}
        required={true}
        validateMessage="Name is required"
        onChange={(e) =>
          setFormData({ ...formData, full_name: e.target.value })
        }
        value={formData.full_name || ""}
      />
      <Input
        name="Email"
        placeholder="Enter your email address"
        icon={<Mail className="size-5" />}
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^$"
        validateMessage="Please enter a valid email address"
        required={true}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email || ""}
      />
      <Input
        name="Phone Number"
        placeholder="Enter your phone number"
        icon={<Phone className="size-5" />}
        required={true}
        validateMessage="Phone number is required"
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        value={formData.phone || ""}
      />
      <Input
        name="Password"
        placeholder="Enter your password"
        icon={<Lock className="size-5" />}
        minLength={8} // Password must be at least 8 characters
        validateMessage="Password must be at least 8 characters"
        required={true}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        value={formData.password || ""}
      />
      <CustomButton
        buttonName="GET STARTED"
        icon={<ArrowRight className="size-5" />}
        style="w-full mt-3 "
        type="submitButton"
      />
      <Divider name="Or" textStyle="text-sm" />
      <GoogleLogin />
      <FormLink
        link="/signin"
        status="Already have an account?"
        statusName="SIGN IN HERE"
      />
    </form>
  );
};

import React, { useState } from "react";
import { Input } from "../UI/Input";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { CustomButton } from "../UI/CustomButton";
import { Divider } from "../UI/Divider";
import GoogleLogin from "../UI/GoogleLogin";
import { FormLink } from "../UI/FormLink";
// import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const SinginFrom = () => {
  const { signIn } = useNewAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    const isSuccess = await signIn(formData);
    if (!isSuccess) {
      return;
    } else {
      navigate("/");
    }
  };
  return (
    <form
      className="w-full flex flex-col justify-start items-start "
      onSubmit={handleSubmit}
    >
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
        buttonName="CONTINUE"
        icon={<ArrowRight className="size-5" />}
        style="w-full mt-3 "
        type="submitButton"
      />
      <Divider name="Or" textStyle="text-sm" />
      <GoogleLogin />
      <FormLink
        link="/signup"
        status="Don't have an account?"
        statusName="SIGN UP HERE"
      />
    </form>
  );
};

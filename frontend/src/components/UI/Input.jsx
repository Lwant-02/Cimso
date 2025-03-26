import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

export const Input = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  pattern,
  validateMessage,
  minLength = 2,
  maxLength = 30,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      {name && <p className="text-sm ">{name}</p>}
      <label className="input validator w-full rounded-xl">
        {icon && <span>{icon}</span>}
        <input
          type={name === "Password" && !showPassword ? "password" : "text"}
          required={required}
          placeholder={placeholder}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          value={value || ""}
          onChange={onChange}
          name={name}
        />
        {name === "Password" && (
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye className="size-5 cursor-pointer" />
            ) : (
              <EyeClosed className="size-5 cursor-pointer" />
            )}
          </span>
        )}
      </label>
      <p className="validator-hint">{validateMessage}</p>
    </div>
  );
};

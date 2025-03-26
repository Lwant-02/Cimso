import axios from "axios";
import { Image } from "lucide-react";
import React from "react";

export const ImagePicker = ({
  profilePic,
  fileRef,
  setIsUploading,
  setFormData,
  isPicked,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
    isPicked(true);
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "TechFolio");
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    try {
      setIsUploading(true);
      const res = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, data);
      setFormData((pre) => ({ ...pre, profile_pic: res.data?.url }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="absolute bottom-0 right-0 ">
      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/*"
        onChange={handleChange}
      />
      <div
        className={`${
          profilePic ? "bg-accent-color text-white" : "bg-primary-color"
        }   p-2 rounded-full border border-base-content/10 cursor-pointer hover:bg-accent-color hover:text-white transition-colors duration-300`}
        onClick={handleClick}
      >
        <Image className="sm:size-6 size-4" />
      </div>
    </div>
  );
};

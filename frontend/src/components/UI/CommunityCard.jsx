import { ChevronUp, Facebook, Linkedin, Twitter } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const CommunityCard = ({
  linkedin_url,
  facebook_url,
  twitter_url,
  name,
  bio,
}) => {
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const url =
    "https://res.cloudinary.com/dxmvqasul/image/upload/v1743003585/Rectangle_6704_cvbblm.png";

  const socialLinks = [
    {
      icon: <Linkedin className="sm:size-5 size-3" />,
      name: "LinkedIn",
      url: linkedin_url,
    },
    {
      icon: <Facebook className="sm:size-5 size-3" />,
      name: "Twitter",
      url: facebook_url,
    },
    {
      icon: <Twitter className="sm:size-5 size-3" />,
      name: "Twitter",
      url: twitter_url,
    },
  ];
  return (
    <motion.div
      className="relative sm:w-72 shadow-lg rounded-xl overflow-hidden "
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"></div>

      {/* Image Container */}
      <div className="relative h-80 w-full">
        <img src={url} alt="Profile" className="w-full h-full object-cover" />
      </div>

      {/* Profile Info Overlay */}
      <div className="absolute bottom-12 left-0 right-0 p-4 text-white">
        <h2 className="sm:text-2xl font-semibold mb-1 ">{name}</h2>
        <p className="sm:text-sm text-xs mt-2">{bio}</p>
      </div>

      {/* Social Link Button */}
      <div className="absolute bottom-0 sm:left-0 sm:right-0 right-3 p-4 pt-0">
        <div className="relative">
          <button
            onClick={() => setShowSocialLinks(!showSocialLinks)}
            className="sm:w-full bg-white/20 backdrop-blur-sm text-white cursor-pointer py-2 px-4 rounded-full flex justify-center sm:text-base text-xs items-center hover:bg-white/30 transition-all"
          >
            Social Links
            <ChevronUp className="ml-2 sm:sixe-6 size-3" />
          </button>
          {showSocialLinks && (
            <div className="absolute bottom-full left-0 right-0 mb-2">
              <div className="bg-white/90 rounded-lg shadow-lg overflow-hidden">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 hover:bg-gray-100 transition-colors"
                  >
                    {link.icon}
                    <span className="ml-3">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

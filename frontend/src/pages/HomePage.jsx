import { useState } from "react";
import { motion } from "framer-motion";
import { HomeSearchField } from "../components/Home/HomeSearchField";
import { AISection } from "../components/Home/AISection";
import { FeatureCourseCard } from "../components/UI/FeatureCourseCard";
import { Divider } from "../components/UI/Divider";
import { ReviewCard } from "../components/UI/ReviewCard";
import { Footer } from "../components/UI/Footer";
import { ChatbotBox } from "../components/UI/ChatbotBox";
import { Bot } from "../components/UI/Bot";
import { NewsSection } from "../components/Home/NewsSection";
import { Packages } from "../components/UI/Packages";
import { featureCourse, images } from "../utils/constant";
import { reviewers } from "../utils/constant";
import { useNewBookingStore } from "../store/useNewBookingStore";

export const HomePage = () => {
  const [showChat, setShowChat] = useState(false);
  const { packages } = useNewBookingStore();

  return (
    <div className="relative w-full flex-1 overflow-auto overflow-y-auto justify-center items-center flex flex-col">
      <motion.div
        className="relative w-full sm:h-[60vh] h-[45vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${images.homeLogo})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <h1 className="text-primary-color sm:text-5xl text-xl font-bold drop-shadow-xl">
            Your Ultimate Online Golf Booking Experience!
          </h1>
          <p className="text-primary-color sm:text-2xl text-sm mt-2 font-bold">
            Discover, Book, and Play the World’s Best Golf Courses with Ease
          </p>
          <HomeSearchField />
        </div>
      </motion.div>
      <div className="py-8 sm:w-5/6 w-auto sm:px-0 px-3 flex flex-col justify-center items-center gap-7">
        <AISection setShowChat={setShowChat} />
        <Divider
          name="Upcoming Events"
          textStyle="sm:text-3xl text-lg font-semibold"
        />
        <NewsSection />
        <Divider
          name="Feature Courses"
          textStyle="sm:text-3xl text-lg font-semibold"
        />
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-5">
          {featureCourse.map((item) => (
            <FeatureCourseCard
              delay={item.delay}
              key={item.title}
              name={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        <Divider
          name="Our Packages"
          textStyle="sm:text-3xl text-lg font-semibold"
        />
        <div className="w-full h-auto gap-8 grid sm:grid-cols-3 grid-cols-1 place-items-center">
          {packages.map((item) => (
            <Packages
              key={item.id}
              title={item.name}
              price={item.price}
              badge="Most Popular"
              features={item.features}
              isFeatrue={item.is_featured}
              isHome={true}
            />
          ))}
        </div>
        <Divider
          name="Customer Reviews"
          textStyle="sm:text-3xl text-lg font-semibold"
        />
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-5">
          {reviewers.map((item) => (
            <ReviewCard
              key={item.name}
              name={item.name}
              comment={item.comment}
              rating={item.rating}
              date={item.dateAgo}
              pic={item.picture}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
      <Footer />
      <Bot setShowChat={setShowChat} />
      {showChat && <ChatbotBox onClose={() => setShowChat(false)} />}
    </div>
  );
};

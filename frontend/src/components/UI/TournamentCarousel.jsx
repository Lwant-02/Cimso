import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { tournamentsImages } from "../../utils/constant";

export default function TournamentCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className="sm:max-w-[400px] w-full rounded-lg border border-base-content/10"
    >
      <SwiperSlide className="w-full h-[200px]">
        <img
          src={tournamentsImages.logo1}
          alt="Slide 1"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </SwiperSlide>
      <SwiperSlide className="w-full h-[200px]">
        <img
          src={tournamentsImages.logo2}
          alt="Slide 2"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </SwiperSlide>
      <SwiperSlide className="w-full h-[200px]">
        <img
          src={tournamentsImages.logo3}
          alt="Slide 3"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </SwiperSlide>
      <SwiperSlide className="w-full h-[200px]">
        <img
          src={tournamentsImages.logo4}
          alt="Slide 4"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </SwiperSlide>
      <SwiperSlide className="w-full h-[200px]">
        <img
          src={tournamentsImages.logo5}
          alt="Slide 5"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </SwiperSlide>
    </Swiper>
  );
}

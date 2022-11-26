import { useAppSelector } from "../../state/hooks";
import Error from "../ErrorData/Error";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { IMAGE_BASE_URL } from "../../state/constants";
import {
  CalendarDaysIcon,
  HandThumbUpIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { CircleFlag } from "react-circle-flags";

const HeroSlider = () => {
  const { data, loading, error } = useAppSelector((state) => state.popularFilm);
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    className: "center overflow-hidden my-4",
    centerMode: true,
    centerPadding: "20px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => <ul> {dots} </ul>,
    customPaging: (i: any) => (
      <div className="rounded-full w-6 h-1 absolute -top-5 bg-white bg-opacity-75 hover:bg-opacity-100"></div>
    ),
  };
  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <div className="w-full">
      <Slider {...settings}>
        {data.map((filmData) => {
          return (
            <div className="!flex gap-4 relative px-4" key={filmData.id}>
              <img
                // className="rounded-md mx-auto sm:mx-0 w-[320px] sm:w-[360px] md:w-[320px] lg:w-[400px] xl:w-[480px] object-cover"
                className="rounded-xl"
                src={
                  IMAGE_BASE_URL + filmData.backdrop_path ||
                  filmData.poster_path
                }
                alt={filmData.title}
              />
              <div className="absolute bg-primary bg-opacity-40 h-full w-full flex flex-col p-4">
                <h1 className="flex-col flex  text-2xl md:text-4xl font-semibold lg:text-9xl">
                  {filmData.title.split(" ")[0].replace(":", "")}
                  <span className=" text-fill-transparent text-stroke-2">
                    {filmData.title.split(" ")[1]}
                  </span>
                </h1>
              </div>
              <div className=" w-1/2 h-full backdrop-blur-lg right-0 flex flex-col absolute justify-between p-4 rounded-md">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="px-4 py-1 flex justify-center items-center gap-2 rounded-md bg-secondary uppercase text-white font-semibold ">
                      <CircleFlag
                        className="w-6"
                        countryCode={
                          filmData.original_language === "en"
                            ? "gb"
                            : filmData.original_language
                        }
                      />
                      {filmData.original_language}
                    </span>
                    <div className="font-bold flex justify-center items-center gap-2">
                      <span className="px-4 py-1.5 rounded-md bg-amber-400 text-alternative">
                        IMDb
                      </span>
                      <span>{filmData.vote_average}</span>
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-4xl  lg:text-6xl font-bold capitalize">
                    overview
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg">
                    {filmData.overview}
                  </p>
                </div>
                <div className="flex justify-between font-semibold text-text-primary mb-6">
                  <span className="px-4 py-1 gap-4 transition-all duration-500 hover:scale-105 cursor-pointer bg-secondary rounded-md flex justify-center items-center">
                    <HandThumbUpIcon width={32} />
                    {filmData.popularity}
                  </span>

                  <span className="px-4 gap-4 py-1 transition-all duration-500 hover:scale-105 cursor-pointer bg-secondary rounded-md flex justify-center items-center">
                    <UserGroupIcon width={32} />
                    {filmData.vote_count}
                  </span>
                  <span className="px-4 gap-4 py-1 transition-all duration-500 hover:scale-105 cursor-pointer bg-secondary rounded-md flex justify-center items-center">
                    <CalendarDaysIcon width={32} /> {filmData.release_date}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HeroSlider;

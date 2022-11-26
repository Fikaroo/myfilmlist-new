import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { IMAGE_BASE_URL } from "../../state/constants";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { DataProps } from "../../state/slices/PopularSlice";
import { unSaveMovie, saveMovie } from "../../state/slices/SavedMovieSlice";
interface MovieItemProps {
  filmData: DataProps;
}
const MovieItem = ({ filmData }: MovieItemProps) => {
  const [isSave, setSave] = useState(false);
  const { list } = useAppSelector((state) => state.savedMovie);
  useEffect(() => {
    list.find((movie) => movie.id === filmData.id)
      ? setSave(true)
      : setSave(false);
  }, [list]);
  const dispatch = useAppDispatch();
  const handleSave = () => {
    setSave(!isSave);
    isSave ? dispatch(unSaveMovie(filmData.id)) : dispatch(saveMovie(filmData));
  };
  return filmData.poster_path ? (
    <div className="relative p-4 rounded-lg bg-neutral-900">
      <div className="relative">
        <img
          // className="rounded-md mx-auto sm:mx-0 w-[320px] sm:w-[360px] md:w-[320px] lg:w-[400px] xl:w-[480px] object-cover"
          className="rounded-xl object-cover h-[600px] w-full"
          src={IMAGE_BASE_URL + filmData.poster_path}
          alt={filmData.title}
        />
        <div
          onClick={handleSave}
          className="absolute right-3 top-3 w-9 h-9 rounded-full bg-slate-900 flex justify-center items-center group transition-all cursor-pointer"
        >
          <HeartIcon
            width={24}
            className={`stroke-red-400 mt-0.5 transition-all group-hover:fill-red-400 ${
              isSave && "fill-red-400"
            }`}
          />
        </div>
      </div>
      <div className="mt-4">
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
        <h1 className="text-2xl font-bold mt-4">{filmData.title}</h1>
      </div>
    </div>
  ) : null;
};

export default MovieItem;

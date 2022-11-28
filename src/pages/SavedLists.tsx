import axios from "axios";
import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { useLocation, useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "../state/constants";
import { DataProps } from "../state/slices/PopularSlice";
const getListMovies = async (id: any) => {
  const { data } = await axios.get(
    `https://acb-api.algoritmika.org/api/movies/list/${id}`
  );

  return data;
};

type DataType = { id?: string; title?: string; movies: DataProps[] };
const SavedLists = () => {
  const [data, setData] = useState({} as DataType);
  const id = useParams().id;
  useEffect(() => {
    getListMovies(id).then((data) => setData(data));
  }, []);
  console.log(data);
  if (!data.movies) return <div>Loading...</div>;
  return (
    <div className="mt-2">
      <h1 className="text-4xl font-bold ">{data.title}</h1>
      <div className="grid grid-cols-3 gap-4 my-4">
        {data.movies.map((filmData: DataProps) => {
          return (
            <div
              key={filmData.id}
              className="relative p-4 rounded-lg bg-neutral-900"
            >
              <div className="relative">
                <img
                  // className="rounded-md mx-auto sm:mx-0 w-[320px] sm:w-[360px] md:w-[320px] lg:w-[400px] xl:w-[480px] object-cover"
                  className="rounded-xl object-cover h-[600px] w-full"
                  src={IMAGE_BASE_URL + filmData.poster_path}
                  alt={filmData.title}
                />
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
          );
        })}
      </div>
    </div>
  );
};

export default SavedLists;

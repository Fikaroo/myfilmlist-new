import React from "react";

type Props = {};

const MovieItemLoading = (props: Props) => {
  return (
    <div>
      <div className="relative p-4 rounded-lg bg-neutral-900 animate-pulse">
        <div className="relative">
          <div
            // className="rounded-md mx-auto sm:mx-0 w-[320px] sm:w-[360px] md:w-[320px] lg:w-[400px] xl:w-[480px] object-cover"
            className="rounded-xl object-cover h-[600px] w-full bg-slate-600 animate-pulse"
          ></div>
        </div>
        <div className="mt-4">
          <div className="flex gap-4">
            <span className="px-4 py-1 flex w-24 h-12 justify-center items-center gap-2 rounded-md bg-slate-800 animate-pulse uppercase text-white font-semibold "></span>
            <div className="font-bold flex justify-center items-center gap-2">
              <span className="px-4 py-1.5 w-24 bg-slate-800 anima h-12 animate-pulse rounded-md  text-alternative"></span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4 w-72 h-8 bg-slate-800 rounded"></h1>
        </div>
      </div>
    </div>
  );
};

export default MovieItemLoading;

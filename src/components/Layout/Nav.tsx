import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppSelector } from "../../state/hooks";
import Search from "../Search";
import SaveModal from "../Modal/SaveModal";
import { Link } from "react-router-dom";
const Nav = () => {
  const { count } = useAppSelector((state) => state.savedMovie);
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <nav className="fixed my-2 w-full left-[70px] container z-10 bg-alternative  rounded-lg">
        <div className="flex justify-between items-center p-4">
          <div className="font-bold text-2xl ">FavFilm</div>
          <div>
            <Search />
          </div>
          <div className="flex gap-4">
            <div className="flex relative px-2">
              <BookmarkIcon
                width={32}
                className="hover:fill-current hover:cursor-pointer"
                onClick={() => setOpen(true)}
              />
              <span className="absolute -right-1.5 -top-3.5 flex justify-center items-center rounded-full bg-red-400 w-7 h-7 text-sm">
                {count}
              </span>{" "}
            </div>{" "}
            {/* <Link to="/saved-lists">
              <button className="font-medium px-4 py-1">
                My Lists
              </button>
            </Link> */}
          </div>
        </div>
      </nav>
      <SaveModal
        count={count === undefined ? 0 : count}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </>
  );
};

export default Nav;

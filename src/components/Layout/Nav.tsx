import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppSelector } from "../../state/hooks";
import Search from "../Search";
import SaveModal from "../Modal/SaveModal";
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
          <div className="flex relative px-2">
            <BookmarkIcon
              width={32}
              className="hover:fill-current hover:cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <span className="absolute -right-1.5 -top-3.5 flex justify-center items-center rounded-full bg-red-400 w-7 h-7 text-sm">
              {count}
            </span>
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

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../state/hooks";
import { getMoviesSearch } from "../state/slices/MoviesSlice";

const Search = () => {
  const [val, setVal] = useState("");
  const dispatch = useAppDispatch();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const btnVariant = {
    open: { x: 0 },
    closed: { x: "-360%" },
  };

  const handleBtn = () => {
    if (isOpen) {
      setIsOpen(false);
      val && dispatch(getMoviesSearch(val));
      setVal("");
    } else {
      setIsOpen(true);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div layout className="flex gap-4">
      <motion.input
        disabled={!isOpen}
        className="px-4 py-1 text-primary rounded-md focus:outline-none opacity-0"
        type="text"
        value={val}
        onChange={handleInput}
        placeholder="Search Movie"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      />
      <motion.button
        layout
        onClick={() => handleBtn()}
        variants={btnVariant}
        animate={isOpen ? "open" : "closed"}
        className="bg-secondary rounded px-2 py-1.5 bg-opacity-80 hover:bg-opacity-100 relative"
      >
        <MagnifyingGlassIcon width={24} />
      </motion.button>
    </motion.div>
  );
};

export default Search;

import { Dialog, Transition } from "@headlessui/react";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { IMAGE_BASE_URL } from "../../state/constants";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  addList,
  deleteList,
  unSaveMovie,
} from "../../state/slices/SavedMovieSlice";

interface ISavedModal {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  count: number;
}

const SaveModal = ({ isOpen, setOpen, count }: ISavedModal) => {
  const [val, setVal] = useState("");
  const [err, setERR] = useState(false);
  const dispatch = useAppDispatch();
  const handleListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    setERR(false);
  };

  const { list, savedList } = useAppSelector((state) => state.savedMovie);
  const saveList = () => {
    console.log(count);
    if (val && count !== 0) {
      setVal("");
      dispatch(addList(val));
    } else if (count !== 0) {
      setERR(true);
    }
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full min-h-[600px] text-text-primary transform  rounded-2xl bg-primary p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-4xl font-medium leading-6"
                >
                  Your Liked Movies List
                </Dialog.Title>
                <div className="mt-6 relative flex">
                  <div className={`grid grid-cols-4 gap-6 flex-1`}>
                    {count ? (
                      list.map((movie, idx) => (
                        <div className="w-full p-5" key={movie.id}>
                          <div className="bg-alternative relative rounded-md p-5">
                            <span className=" bg-blue-100 font-medium text-primary w-8 left-2 top-2 h-8 absolute flex rounded justify-center items-center">
                              {idx}
                            </span>
                            <div className="absolute -top-2 -right-2 w-6 h-6 ">
                              <XMarkIcon
                                className="cursor-pointer flex justify-center rounded-md border border-transparent bg-blue-100 stroke-alternative hover:bg-blue-200 focus:outline-none"
                                onClick={() => dispatch(unSaveMovie(movie.id))}
                              ></XMarkIcon>
                            </div>
                            <div>
                              <img
                                // className="rounded-md mx-auto sm:mx-0 w-[320px] sm:w-[360px] md:w-[320px] lg:w-[400px] xl:w-[480px] object-cover"
                                className="rounded object-cover w-full "
                                src={IMAGE_BASE_URL + movie.poster_path}
                                alt={movie.title}
                              />
                            </div>
                            <div>
                              <h1 className="text-white font-medium text-lg text-center mt-2">
                                {movie.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-lg font-medium bg-alternative px-4 py-1 w-fit h-fit">
                        No Movie
                      </p>
                    )}
                  </div>
                  <div className="bg-alternative w-72 rounded min-h-80 p-4 flex flex-col items-center gap-4">
                    <h2 className="font-semibold text-lg">Save List</h2>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="rounded focus:outline-none text-alternative px-3 py-1"
                        placeholder="List Name"
                        onChange={(e) => handleListName(e)}
                        value={val}
                      />
                      {err && (
                        <span className="text-red-400 text-sm font-medium">
                          Please enter a name
                        </span>
                      )}
                    </div>
                    <button
                      onClick={saveList}
                      className="bg-blue-100 px-4 py-1 rounded text-primary font-medium hover:bg-blue-200"
                    >
                      Add List
                    </button>
                    <div className="grid gap-2 w-full rounded p-3">
                      {savedList &&
                        savedList.map((list) => (
                          <div
                            className="bg-primary max-w-[230px] flex rounded p-2 flex-col relative"
                            key={list.id}
                          >
                            <div className="flex gap-2">
                              <ClipboardDocumentListIcon width={24} />
                              <p className="font-medium text-lg capitalize">
                                {list.nameList}
                              </p>
                            </div>
                            <span className="font-medium text-sm">
                              Film Number: {list.length}
                            </span>
                            <div className="absolute -top-2 -right-2 w-5 h-5 ">
                              <XMarkIcon
                                className="cursor-pointer flex justify-center rounded-md border border-transparent bg-blue-100 stroke-alternative hover:bg-blue-200 focus:outline-none"
                                onClick={() => dispatch(deleteList(list.id))}
                              ></XMarkIcon>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 ">
                  <XMarkIcon
                    className="cursor-pointer flex justify-center rounded-md border border-transparent bg-blue-100 stroke-alternative hover:bg-blue-200 focus:outline-none"
                    onClick={closeModal}
                  ></XMarkIcon>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SaveModal;

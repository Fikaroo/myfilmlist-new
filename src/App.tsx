import Home from "./pages/Home";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useRef, useState } from "react";
import SavedLists from "./pages/SavedLists";
import { Route, Routes } from "react-router-dom";

function useStateReference(value: any) {
  const ref = useRef(value);
  const [, forceRender] = useState(false);

  function updateState(newState: any) {
    if (!Object.is(ref.current, newState)) {
      ref.current = newState;
      forceRender((s: any) => !s);
    }
  }

  return [ref, updateState];
}

function App() {
  // const alanBtnRef = useRef({}).current;
  // useEffect(() => {
  //   alanBtnRef.btnInstance = alanBtn({
  //     key: "f3c77dc2ea437d9cf31cc8321b1eaeae2e956eca572e1d8b807a3e2338fdd0dc/stage",
  //   });
  // }, []);
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-primary">
      <div className="container text-text-primary px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-list/:id" element={<SavedLists />} />
        </Routes>
        {/* <button
          onClick={() => {
            alanBtnRef.btnInstance.callProjectApi(
              "setClientData",
              { value: "your data" },
              function (error, result) {
                // handle error and result here
              }
            );
          }}
        >
          Call setClientData method
        </button> */}
      </div>
    </div>
  );
}

export default App;

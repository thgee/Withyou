import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import React, { createContext, useState } from "react";
import "./App.scss";
import Interview from "./pages/Interview";
import Home from "./pages/Home";
import { NameJobContext } from "./types/types";

export const nameJobContext = createContext<NameJobContext | undefined>(
  undefined
);

function App() {
  const [name, setName] = useState<string>("");
  const [job, setJob] = useState<string>("");

  return (
    <nameJobContext.Provider value={{ name, setName, job, setJob }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview/:selectedMode" element={<Interview />} />
        </Routes>
      </HashRouter>
    </nameJobContext.Provider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { createContext, useState } from "react";
import "./App.scss";
import Actual from "./pages/Actual";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actual" element={<Actual />} />
        </Routes>
      </BrowserRouter>
    </nameJobContext.Provider>
  );
}

export default App;

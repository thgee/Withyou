import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Actual from "./pages/Actual";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actual" element={<Actual />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Interview from "./pages/Interview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="font-roboto bg-[black] text-white min-h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

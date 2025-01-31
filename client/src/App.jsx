import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";

function App() {
  return (
    <div className="font-roboto bg-[#0F0F0F] text-white min-h-full">
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

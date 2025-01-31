import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLogin } from "./state";

function App() {
  const tokenFromRedux = useSelector((state) => state.auth?.token);
  const tokenFromStorage = localStorage.getItem("authToken");
  const isAuth = Boolean(tokenFromRedux || tokenFromStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token and user are in localStorage
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      // If they exist, dispatch the setLogin action
      dispatch(setLogin({ user, token }));
    }
  }, [dispatch]);

  return (
    <div className="font-roboto bg-[#0F0F0F] text-white min-h-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

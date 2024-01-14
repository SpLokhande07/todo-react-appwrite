import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        try {
          if (userData) {
            dispatch(login(userData));
          } else {
            dispatch(logout());
          }
        } catch (err) {
          console.log("Main App.jsx: error : ", err);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="bg-gray-400 min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          TODO : Add your app here
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext({
  user: null,
  setUser: () => {},
  showLogin: false,
  setShowLogin: () => {},
});

const AppContextProvider = ({ children }) => {
  // Auth + UI states
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ---------- CREDITS / USER LOAD ----------
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/credits",
        { headers: { token } }
      );

      console.log("credits API response =>", data);

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        // agar backend 200 + success:false bhej raha ho
        toast.error(data.message || "Failed to load credits");
      }
    } catch (error) {
      console.log("loadCreditsData error =>", error.response?.data || error);
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  // ---------- IMAGE GENERATION (returns array of 5 images) ----------
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImages;
      } else {
        toast.error(data.message || "Something went wrong");
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
        return null;
      }
    } catch (error) {
      console.log(
        "generateImage axios error =>",
        error.response?.data || error
      );

      const msg = error.response?.data?.message || error.message;
      toast.error(msg);

      const creditBalance =
        error.response?.data?.creditBalance ?? undefined;

      loadCreditsData();

      if (creditBalance === 0) {
        navigate("/buy");
      }

      return null;
    }
  };

  // ---------- LOGOUT ----------
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
  };

  // ---------- EFFECT: AUTO LOAD CREDITS ON TOKEN ----------
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

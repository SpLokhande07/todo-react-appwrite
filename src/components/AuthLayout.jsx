import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "../appwrite/auth";
import { set } from "react-hook-form";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log(`authStatus ${authStatus}`);
    console.log(`authenticaiton ${authentication}`);
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

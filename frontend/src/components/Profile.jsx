import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/profile`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);
  const handleLogout = () => {
    window.open("http://localhost:8000/logout", "_self");
  };
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        {user ? (
          <>
            <h2>Welcome, {user.displayName}!</h2>
            <img src={user.photos[0].value} alt="Profile" />
            <p>Email: {user.emails[0].value}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default Profile;

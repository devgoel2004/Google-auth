import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/auth/profile", {
          withCredentials: true, // Important to include cookies
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:8000/auth/logout"; // Backend logout
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Profile Page</h2>
      {user ? (
        <>
          <img src={user.avatar} alt="User Avatar" width="100" />
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            style={{ padding: "10px", fontSize: "16px" }}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

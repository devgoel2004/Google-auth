import React from "react";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google"; // Redirect to backend Google auth
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <button
        onClick={handleGoogleLogin}
        style={{ padding: "10px", fontSize: "16px" }}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;

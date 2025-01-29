import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <div>
      <h2>Login With Google</h2>
      <button onClick={handleLogin}>Sign in with google</button>
    </div>
  );
};

export default Login;

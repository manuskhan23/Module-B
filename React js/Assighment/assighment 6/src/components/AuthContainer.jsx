import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg" style={{ width: "420px" }}>
        {isLogin ? (
          <Login switchMode={() => setIsLogin(false)} />
        ) : (
          <Signup switchMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
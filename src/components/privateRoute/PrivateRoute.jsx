import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import Login from "../../routes/user/Login";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return <>
    {isAuthenticated ? children : <Login />}
  </>;
};

export default PrivateRoute;

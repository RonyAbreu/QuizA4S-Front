import { useContext } from "react";
import { AuthenticationContext } from "../../context/AutenticationContext";
import Login from "../../routes/user/Login";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return <>
    {isAuthenticated ? children : <Login />}
  </>;
};

export default PrivateRoute;

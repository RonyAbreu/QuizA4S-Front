import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const routerError = useRouteError();
  return (
    <div>
      <h1>Ops! Página não encontrada</h1>
      <p>{routerError.error.message}</p>
      <p>{routerError.statusText}</p>
    </div>
  );
};

export default ErrorPage;

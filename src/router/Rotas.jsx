import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

const Rotas = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Rotas;

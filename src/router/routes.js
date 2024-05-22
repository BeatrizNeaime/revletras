import About from "../pages/about";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from './../pages/register/index';
import GamesPage from './../pages/games/index';
import Asteroids from "../games/asteroids/Asteroids";
import Memory from "../games/memory/Index";
export const routes = [
  {
    id: 1,
    path: "/",
    label: "Início",
    show: true,
    element: <Home />,
  },
  {
    id: 2,
    path: "/sobre",
    label: "Sobre",
    show: true,
    element: <About />,
  },
  {
    id: 3,
    path: "/login",
    label: "Login",
    show: true,
    element: <Login />,
  },
  {
    id: 4,
    path: "/cadastro",
    label: "Cadastro",
    show: false,
    element: <Register />,
  },
  {
    id: 5,
    path: "/forgot-password",
    label: "Esqueci minha senha",
    show: false,
    element: <></>,
  },
  {
    id: 6,
    path: "/jogos",
    label: "Jogos",
    show: false,
    element: <GamesPage />,
  },
  {
    id: 7,
    path: "/asteroids",
    label: "Asteroids",
    show: false,
    element: <Asteroids level={5} />
  },
  {
    id: 8,
    path: "/memoria",
    label: "Memória",
    show: false,
    element: <Memory />
  }
]
import Rotas from "./router/Rotas";
import LayoutComponent from "./styles/layout/Index";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  if (window.location.pathname.includes('jogos')) {
    return (
      <Router>
        <Rotas />
      </Router>
    )
  }
  return (
    <Router>
      <LayoutComponent>
        <Rotas />
      </LayoutComponent>
    </Router>
  );
}

export default App;

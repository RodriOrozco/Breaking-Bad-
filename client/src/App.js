import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import LandingPage from "./components/Landing";
import CharacterCreate from "./components/CharacterCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/character" component={CharacterCreate} />
          <Route exact path="/characters/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

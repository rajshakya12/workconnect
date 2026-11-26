import City from "./components/CityComponent/City";
import { BrowserRouter as Router,Routes,Route } from "react-router";
import Login from "./components/loginComponent/Login"

import Dashboard from "./components/loginComponent/Dashboard";
function App() {
  return (
<div> 
  <Router>
    <Routes>
      <Route element={<Dashboard/>} path="/dashboard/*"/>
      <Route element={<Login/>} path="/adminlogin"/>
      </Routes>
  </Router>

     </div>
  );
}

export default App;

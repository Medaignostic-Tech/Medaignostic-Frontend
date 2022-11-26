import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages";
import MyOrder from "./pages/my-order";
import HistoryOrder from "./pages/history-order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/history-order" element={<HistoryOrder />} />
      </Routes>
    </Router>
  );
}

export default App;

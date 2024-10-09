import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages";
import MyOrder from "./pages/my-order";
import HistoryOrder from "./pages/history-order";
import Statistic from "./pages/statistic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/history-order" element={<HistoryOrder />} />
        <Route path="/statistic" element={<Statistic />} />
      </Routes>
    </Router>
  );
}

export default App;

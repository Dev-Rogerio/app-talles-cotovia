import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Measure from "../src/pages/Measure/Measure.jsx";
import ModalMeasure from "../src/pages/Modalmeasure/ModalMeasure.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Measure />} />
        <Route path="/modalmeasure" element={<ModalMeasure />} />
      </Routes>
    </Router>
  );
}

export default App;

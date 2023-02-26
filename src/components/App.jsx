import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from "./pages/Detail";
import Listing from "./pages/Listing";

import '../styles/lizard.scss';

function App() {


  return <>
    <Router>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
    </Router>
  </>;
}

export default App;

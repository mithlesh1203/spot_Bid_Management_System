import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Component/Hadder/Nav';
import SpotBidForm from './Component/SpotBid/SpotBidForm';
import SpotBidDetails from './Component/SpotBid/SpotBidDetails';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/spot-bid-form' element={<SpotBidForm />} />
          <Route path='/spot-bid-details' element={<SpotBidDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

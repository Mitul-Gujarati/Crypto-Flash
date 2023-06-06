import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Alert from './Components/Alert'
import { lazy, Suspense } from 'react';
import Nft from './Components/Nft';
import NftInfo from './Components/NftInfo';

const HomePage = lazy(() => import("./Components/HomePage"))
const CoinPage = lazy(() => import("./Components/CoinPage"))
const NftDetails = lazy(() => import("./Components/NftDetails"))

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header  />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
            <Route path="/nfts" element={<Nft />} />
            <Route path="/nfts/:id" element={<NftInfo />} />
            <Route path="/nfts/:id/:contract" element={<NftDetails />} />
          </Routes>
        </Suspense>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;

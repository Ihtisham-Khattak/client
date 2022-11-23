import './App.css';
import { useEffect } from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'; 
import  Home  from './sences/home/Home';
import  Checkout  from './sences/checkOut/Checkout';
import  Confirmation  from './sences/checkOut/Confirmation';
import  ItemDetails from './sences/itemDetails/ItemDetails';
import Nabar from './sences/global/Nabar';


const ScrollToTop = () => {
 
  const { pathName } = useLocation();

  useEffect( () => {
    window.scrollTo(0,0);
  }, [pathName]);
}

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Nabar />
     <ScrollToTop />
     <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='item/:itemId' element={<ItemDetails />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/checkout/success' element={<Confirmation />}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

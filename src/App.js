import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './component/ProductPage/ProductPage';
import Collections from './views/Collections/Collections';
import Layout from './views/Layout/Layout';
import Shop from './views/Shop/Shop';
import ShopItem from './component/ShopItem/ShopItem'
import Home from './views/Home/Home';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index path='/' element={<Home />} />
        <Route path='collections' element={<Collections />}>
          <Route path=':option' element={<ProductPage />} >
          </Route>
        </Route>
        <Route path='shop' element={<Shop />}>
          <Route path=':option/:product' element={<ShopItem />} >

          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

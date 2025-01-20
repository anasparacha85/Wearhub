import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NewArrival from './Components/NewArrival.jsx'
import ProductsDetail from './Components/ProductsDetail.jsx'
import Cart from './Components/Cart.jsx'
// import Home from './Components/Home.jsx'
import { BrowserRouter,Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import MensCollection from './Components/MensCollection.jsx'
import WomensCollection from './Components/WomensCollection.jsx'
import {Home} from './Components/Home.jsx'
import ShopDashboard from './Components/ShopDashboard.jsx'
import Mainshop from './Components/Mainshop.jsx'
import MainmensColection from './Components/MainmensColection.jsx'
import MainWomensColection from './Components/MainWomensCollection.jsx'
import Saya from './Components/Saya.jsx'
import Bonanza from './Components/Bonanza.jsx'
import JJ from './Components/JJ.jsx'
import Khaadi from './Components/Khaadi.jsx'
const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
  <Route path='' element={<Home/>}/>
  <Route path='/Shop' element={<ShopDashboard/>}>
  <Route path='' element={<Mainshop/>}/>
  <Route path='Saya' element={<Saya/>}/>
  <Route path='Bonanza' element={<Bonanza/>}/>
  <Route path='Khaadi' element={<Khaadi/>}/>
  <Route path='j.' element={<JJ/>}/>
  </Route>
  <Route path='/Mens' element={<MensCollection/>}>
  <Route path='' element={<MainmensColection/>}/></Route>
  <Route path='/Womens' element={<WomensCollection/>}>
  <Route path='' element={<MainWomensColection/>}/>
  </Route>
  <Route path='/new-arrivals' element={<NewArrival/>}></Route>
  <Route path='/ProductsDetail' element={<ProductsDetail/>}/>
  <Route path='/Cart' element={<Cart/>}/>

  </Route>
))

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

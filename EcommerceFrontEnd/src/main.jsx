import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NewArrival from './Pages/NewArrival.jsx'
import ProductsDetail from './Pages/ProductsDetail.jsx'
import Cart from './Pages/Cart.jsx'
// import Home from './Components/Home.jsx'
import { BrowserRouter,Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import MensCollection from './Pages/MensCollection.jsx'
import WomensCollection from './Pages/WomensCollection.jsx'
import Home from './Pages/Home.jsx'
import ShopDashboard from './Pages/ShopDashboard.jsx'
import Mainshop from './Pages/Mainshop.jsx'
import MainmensColection from './Pages/MainmensColection.jsx'
import MainWomensColection from './Pages/MainWomensCollection.jsx'
import Logout from './Pages/Logout.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.js'

import ProductsDetailRoute from './Pages/ProductRoute/ProductsDetailRoute.jsx'
import CheckoutPage from './Pages/CheckOut.jsx'
import PaymentSuccess from './Pages/PaymentSuccess.jsx'
const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
  <Route path='' element={<Home/>}/>
  <Route element={<ProductsDetailRoute/>}>
  <Route path='/productsdetail/:id' element={<ProductsDetail/>}/>
  </Route>
  <Route path='/Shop' element={<ShopDashboard/>}>
  <Route path='' element={<Mainshop/>}/>
 
  </Route>
  <Route path='/Mens' element={<MensCollection/>}>
  <Route path='' element={<MainmensColection/>}/></Route>
  <Route path='/Womens' element={<WomensCollection/>}>
  <Route path='' element={<MainWomensColection/>}/>
  </Route>
  <Route path='/new-arrivals' element={<NewArrival/>}></Route>

  <Route path='/Cart' element={<Cart/>}/>
 <Route path='/Logout' element={<Logout/>}/>
 <Route path='/Checkout' element={<CheckoutPage/>}/>
 <Route path='/payment-success' element={<PaymentSuccess/>}/>
  </Route>
))

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>  
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import Home from './ui/Home';
import Cart from './features/cart/Cart';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import CreateUser from './features/user/CreateUser';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder, { action as newAction } from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Store from './store';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>} errorElement={<Error/>}>
    <Route index element={<Home/>}/>
    <Route path='menu' element={<Menu/>} loader={menuLoader} errorElement={<Error/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='user' element={<CreateUser/>}/>
    <Route path='order/:orderId' element={<Order/>} loader={orderLoader} errorElement={<Error/>}/>
    <Route path='order/new' element={<CreateOrder/>} action={newAction}/>
  </Route>
))

function App() {

  return (
    <RouterProvider router={router} />
  )
}


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container)
root.render(<Provider store={Store}><App/></Provider>)
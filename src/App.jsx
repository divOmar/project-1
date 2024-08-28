import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtctedRoute from './Components/ProtctedRoute/ProtctedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import  { Toaster } from 'react-hot-toast';
import CartContextProvider from './Context/CartContext'
import CheckOut from './Components/CheckOut/CheckOut';
import WishList from './Components/WishList/WishList';
import  WishListContextProvider  from './Context/WishListContext';
import ResetPassword from './Components/ResetPassword/ResetPassword';






let query= new QueryClient()



let x =createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {index:true,element:<ProtctedRoute><Home/></ProtctedRoute>},
    {path:"cart",element:<ProtctedRoute><Cart/></ProtctedRoute>},
    {path:"brands",element:<ProtctedRoute><Brands/></ProtctedRoute>},
    {path:"productDetails/:id/:category",element:<ProtctedRoute><ProductDetails/></ProtctedRoute>},
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>},
    {path:"categories",element:<ProtctedRoute><Categories/></ProtctedRoute>},
    {path:"resetPassword",element:<ResetPassword/>},
    {path:"products",element:<ProtctedRoute><Products/></ProtctedRoute>},
    {path:"checkout",element:<ProtctedRoute><CheckOut/></ProtctedRoute>},
    {path:"wishlist",element:<ProtctedRoute><WishList/></ProtctedRoute>},
    {path:"*",element:<Notfound />},
  ]}
])




function App() {
  const [count, setCount] = useState(0)

  return<>



  <UserContextProvider>


  <CounterContextProvider>
 
    <QueryClientProvider client={query}>
    <CartContextProvider>
    <WishListContextProvider>
    <RouterProvider router={x}></RouterProvider>
    <Toaster/>
    </WishListContextProvider>
    </CartContextProvider>
    
    <ReactQueryDevtools/>
    </QueryClientProvider>
 
  </CounterContextProvider>
  

  </UserContextProvider>
 
  
  
  
  
  </> 
}

export default App

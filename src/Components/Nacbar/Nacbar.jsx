import React, { useContext } from 'react'
import style from "./Nacbar.module.css"
import logo from "../../assets/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Nacbar() {
 let navigate=useNavigate()
 let{numOfCartItems,setnumOfCartItems}=useContext(CartContext)
 let{userLogin,setUserLogin}=useContext(UserContext)
 function SignOut(){
  localStorage.removeItem("userToken")
  setUserLogin(null)
  navigate("/login")
 }
 
 
 return<>
  
  

<nav className=" border-gray-200 bg-slate-200 fixed right-0 top-0 left-0">
    <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
       <div className='flex items-center gap-5'> 
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width="110px" className="h-8" alt="Flowbite Logo" />
        </Link>
       {userLogin!=null?<> <ul className='flex gap-4 '>
              <li><Link to="">Home</Link></li>
              <li><Link to="cart">Cart</Link></li>
              <li><Link to="wishlist">wish list</Link></li>
              <li><Link to="products">Produccts</Link></li>
              <li><Link to="categories">Categories</Link></li>
              <li><Link to="brands">Brands</Link></li>
             </ul></>:null}
             </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className='icons flex gap-4'>
            <i className='fab fa-facebook'></i>
            <i className='fab fa-linkedin'></i>
            <i className='fab fa-youtube'></i>
            <i className='fab fa-tiktok'></i>
            <i className='fab fa-twitter'></i>
            <i className="fa-solid fa-cart-shopping relative">
              <div className='absolute top-[-15px] right-[-15px] size-5 bg-emerald-500 text-white rounded-full flex justify-center items-center'>{numOfCartItems}</div>
            </i>
          </div>
          {userLogin!=null? <span onClick={SignOut} className="text-sm  cursor-pointer">SignOut</span>: <div className='links flex gap-4'>
            <Link to="login" className="text-sm ">Login</Link>
            <Link to="register" className="text-sm ">register</Link>
            
            </div> }
          
        </div>
    </div>
</nav>


  
  
  </>
}

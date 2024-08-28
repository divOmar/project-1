import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';







export default function RecentProducts() {

let {data,isError,error,isLoading,isFetching}=useProducts()
let {addProductToCart,setnumOfCartItems,numOfCartItems}  =  useContext(CartContext)
let {addProductToWishlist}=useContext(WishListContext)
const [loading, setloading] = useState(false)
const [loading2, setloading2] = useState(false)

const [currentId, setcurrentId] = useState(0)
async function addToCart(id){
  setcurrentId(id)
  setloading(true)
  let response=await addProductToCart(id)
  if(response.data.status=="success"){
    setnumOfCartItems(numOfCartItems+1)
    toast.success(response.data.message)
    setloading(false)

  }
  else{
    toast.error(response.data.message)
    setloading(false)
  }
}




async function addToWishList(id){
  setcurrentId(id)
  setloading2(true)
  let response=await addProductToWishlist(id)
  console.log(response.data.status)
  if(response.data.status=="success"){
   toast.success(response.data.message)
   setloading2(false)

  }
  else{
    toast.error(response.data.message)
    setloading2(false)
  }
}


function getProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}

  // let {data,isError,error,isLoading,isFetching}=useQuery({
  //   queryKey:["recentProduct"],
  //   queryFn:getProducts,
  //   staleTime:2000
  // })


if(isError){
  return <h3>{error}</h3>
}


if(isLoading){
  return <div className="spinner"></div>
}

  // const [products, setProducts] = useState([])

  // function getProducts(){
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   .then((res)=>{
  //   // console.log(res.data.data)
  //   setProducts(res.data.data)
  //   })
  //   .catch()

  // }

  // useEffect(()=>{
  //   getProducts()
  // },[])
  return<>
  
  <div className='row flex-row'>
    {  data?.data?.data.map((product)=> <div key={product.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 '>
 
  <div className='product p-3 my-2 hover:border-2 hover:border-emerald-400'>
  <Link to={`productDetails/${product.id}/${product.category.name}`}>
       <div> <img src={product.imageCover} className='w-full' alt="" />
        <h3 className=' text-emerald-600'>{product.category.name}</h3>
        <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='flex justify-between'>
          <span>{product.price}EGP</span>
          <span><i className='fas fa-star text-yellow-300 '></i>{product.ratingsAverage}</span>
        </div>
        </div>
        </Link>
        <button onClick={()=>addToCart(product.id)} className='btn'>{loading &&currentId==product.id?<i className='fas fa-spinner fa-spin'></i>:"Add to cart"}</button>
        <span  onClick={()=>addToWishList(product.id)} className='p-3 cursor-pointer  '>{loading2 &&currentId==product.id?<i className='cursor-pointer fas fa-spinner fa-spin '></i>:<i  className='fa-solid fa-heart'></i>}</span>
  </div>
  
  
 
  </div>)}
  </div>
  
  
  </>
}

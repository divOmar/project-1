import React, { useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';


export default function Cart() {
  const [loading, setloading] = useState(false)
  const [loading2, setloading2] = useState(false)
  const [loading3, setloading3] = useState(false)
 const [cartDetails, setcartDetails] = useState(null)
 const [currentId, setcurrentId] = useState(0)

    let {cartId}=useContext(CartContext)

    let {setnumOfCartItems,numOfCartItems}  =  useContext(CartContext)

    async function getCartItem(){
      let response =await getLoggedUserCart()
      // console.log(response.data.data)
      if(response.data.status=="success"){
        setcartDetails(response.data.data)
      }
    }




    async function updateProduct(id,count){
      setloading2(true)
      setloading3(true)
      setcurrentId(id)
      console.log("ahmed")
      if(count==0){
        deleteProduct(id)
        setloading2(false)

      }
      else{
        let response =await updateCartProductQuantity(id,count)
        console.log(response.data.data)
        if(response.data.status=="success"){
          setcartDetails(response.data.data)
          toast.success("product updated successfully")
          setloading2(false)
        }
        else{
          toast.error("product failled updated")
        }
      }
     
    }
    async function deleteProduct(id){
      setloading(true)
      setcurrentId(id)
      let response =await deleteCartItem(id)
      console.log(response.data.data)
      if(response.data.status=="success"){
        setnumOfCartItems(numOfCartItems-1)
        setcartDetails(response.data.data)
        toast.success("product deleted  successfully")
        setloading(false)
      }
      else{
        toast.error("product failled deleted")
        setloading(false)
      }
    }
    





  let{getLoggedUserCart,updateCartProductQuantity,deleteCartItem}=useContext(CartContext)
  useEffect(()=>{
    getCartItem()
  },[])
 
 
 
 return<>
  
  

  {cartDetails?.products.length>0?<> <h2 className=' text-2xl font-bold capitalize my-4 '>total price : {cartDetails?.totalCartPrice}</h2>
<div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr> 
    </thead>
    <tbody>
    {cartDetails?.products.map((product)=><tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProduct(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              {loading2 &&currentId==product.product.id?<i className='fas fa-spinner fa-spin'></i>:<><span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg></>}
            </button>
            <div>
            <span>{product.count}</span>
            </div>
            <button onClick={()=>updateProduct(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            {loading3 &&currentId==product.product.id?<i className='fas fa-spinner fa-spin'></i>:<><span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg></>}
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${product.price*product.count}
        </td>
        <td className="px-6 py-4">
        <span onClick={()=>deleteProduct(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">{loading &&currentId==product.product.id?<i className='fas fa-spinner fa-spin'></i>:"remove"}</span>
        </td>
      </tr>)}
     
    </tbody>
  </table>
  <Link to={`/checkout`}><button className='btn py-3'>check out</button></Link>
  
</div></>:<h1 className='font-bold text-2xl text-center capitalize bg-slate-300 my-10 '>your cart is empty </h1>}

  
  </>
}

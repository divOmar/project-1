import React, { useContext, useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { WishListContext } from '../../Context/WishListContext'


export default function WishList() {
  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)
  const [WishListDetails, setWishListDetails] = useState(null)




  async function getWishListItems(){
    
 
    let response =await getLoggedWishList()
     console.log(response.data.data)
     if(response.data.status=="success"){
       setWishListDetails(response.data.data)
     }
  }
  async function deleteItem(productId){
    setloading(true)
      setcurrentId(productId)
    let response=await deleteWishList(productId)
    setWishListDetails(response.data.data)
  }
  let{getLoggedWishList,deleteWishList}=useContext(WishListContext)
  useEffect(()=>{
    getWishListItems()
  },[])
 
  return<>
   <h2 className=' text-2xl font-bold capitalize my-4 '>YOUR WISH LIST</h2>
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
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {WishListDetails?.map((product)=><tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.title}
        </td>
       
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${product.price}
        </td>
        <td className="px-6 py-4">
           <span onClick={()=>deleteItem(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">{loading &&currentId==product.id?<i className='fas fa-spinner fa-spin'></i>:"remove"}</span > 
        </td>
      </tr>)}
      
    </tbody>
  </table>
 
  
</div>

 


   
  
  </>
}

import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import axios from 'axios'


export default function Categories() {
  const [categories, setcategories] = useState([])

  async function getCategories(){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      console.log(res.data.data)
      setcategories(res.data.data)
    })
  }
  function getSubCategories(categoryId){
    axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${categoryId}`)
    .then((res)=>{
      console.log(res)
    })
  }

  useEffect(()=>{
    getCategories()
   
  },[])

  return<>
  
  <h2 className='my-3 capitalize font-semibold text-gray-500 text-center'>shop popular categories</h2>
  <div onClick={ getSubCategories()} className='row items-center'> {categories.map((category)=><div className='w-1/3 p-5 hover:border-solid hover:border-2 hover:border-emerald-400' key={category.id}>
    <img src={category.image} className='w-full object-cover  h-[200px]' alt="" />
    <h4>{category.name}</h4>
  </div>)}</div>
  
  </>
}

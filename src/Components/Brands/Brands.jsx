import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'

export default function Brands() {
  const [brands, setbrands] = useState([])
  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{
      console.log(res.data.data)
      setbrands(res.data.data)
    })
  }

  useEffect(()=>{
    getCategories()
  },[])

  return<>
  
  
  <h2 className='my-3 capitalize font-semibold text-gray-500 text-3xl text-center'>all brands</h2>
  <div className='row'> {brands.map((brand)=><div className='w-1/4 p-3  border-solid border-2 border-neutral-200 hover:border-solid hover:border-2 hover:border-emerald-400' key={brand.id}>
    <img src={brand.image} className='w-full object-cover  h-[200px]' alt="" />
    <h4 className='text-center'>{brand.name}</h4>
  </div>)}</div>
  
  
  </>
}

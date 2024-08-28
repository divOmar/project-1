import React from 'react'
import style from "./Products.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import useProducts from '../../Hooks/useProducts'

export default function Products() {
 

  let {data,isError,error,isLoading,isFetching}=useProducts()






// function getProducts(){
//   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
// }

//   let {data,isError,error,isLoading,isFetching}=useQuery({
//     queryKey:["recentProduct"],
//     queryFn:getProducts,
//     staleTime:2000,
//     // select:(data)=> data.data.data
//   })


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
  <CategoriesSlider/>
  <div className='row'>
    {data?.data?.  data.map((product)=> <div key={product.id} className='w-1/6'>
 
  <div className='product p-3 my-2'>
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
        <button className='btn'>Add to cart</button>
  </div>
  
  
 
  </div>)}
  </div>
  
  
  </>
}

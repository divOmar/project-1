import React, { useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";



export default function ProductDetails() {




  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000
  };

const [product, setProduct] = useState(null)
const [relatedProducts, setRelatedProducts] = useState([])
let {id,category}=useParams()
console.log(id)
function getProduct(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  .then((res)=>{
    console.log(res.data.data)
    setProduct(res.data.data)
  })
  .catch((res)=>{
    console.log(res)
  })
}

function getAllProducts(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  .then((res)=>{
    let related=res.data.data.filter((product)=>product.category.name==category)
    setRelatedProducts(related)
  })
}



useEffect(()=>{
  getProduct(id)
  getAllProducts()
},[id,category])
return<>
  
  <div className="row items-center my-5">
    <div className="w-1/4">  <Slider {...settings}>
      {product?.images.map((src)=><img src={src} className='w-full'/>)}
      </Slider>  </div>
    <div className="w-3/4">
    <h4 className='font-semibold capitalize text-2xl'>{product?.title}</h4>
      <h3 className='text-gray-700 my-4'>{product?.description}</h3>
      <h3 className='text-gray-700 my-4'>{product?.category.name}</h3>
      <div className='flex justify-between'>
          <span>{product?.price}EGP</span>
          <span><i className='fas fa-star text-yellow-300 '></i>{product?.ratingsAverage}</span>
        </div>
        <button className='btn'>Add to cart</button>
   </div>
  </div>
  

  <div className='row'>
  {relatedProducts.length>0 ?     relatedProducts.map((product)=> <div key={product.id} className='w-1/6'>
 
  <div className='product p-3 my-2'>
  <Link to={`/productDetails/${product.id}/${product.category.name}`}>
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
  
  
 
  </div>):<div className="spinner"></div>}
  </div>
  
  </>
}

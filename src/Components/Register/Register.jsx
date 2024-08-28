import React, { useContext, useState } from 'react'
import style from "./Register.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from './../../Context/UserContext';

export default function Register() {
let{UserLogin, setUserLogin}=useContext(UserContext)
  const navigate=useNavigate()
const [ApiError, setApiError] = useState("")
const [IsLoading, setIsLoading] = useState(false)


  function handleRegister(values){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then((res)=>{
      console.log(res)
      setIsLoading(false)
      if(res.data.message=="success"){
        localStorage.setItem("userToken",res.data.token)
        setUserLogin(res.data.token)
        navigate("/")
      }
    })
    .catch((res)=>{
      setApiError(res.response.data.message)
      setIsLoading(false)
    })
   
    
  }

   
  let validationSchema=Yup.object().shape({
    name:Yup.string().min(3,"min lenght is 3").max(10,"max lenght is 10").required("name is required"),
    email:Yup.string().email("invalid email").required("email is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid number").required("phone is required"),
    password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password shoud be btween 6 and 10 char").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"rePassword dosent match password").required("password is required"),
  })



  // function valdiateForm(values){
  //   let errors={}
  //   if(values.name==""){
  //     errors.name="name is requird"
  //   }
  //   else if(!/^[A-Z][a-z]{3} $/.test(values.name)){
  //     errors.name="not valid name"
  //   }

  //   if(values.phone==""){
  //     errors.phone=="phone is required"
  //   }
  //   else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
  //     errors.phone="not valid phone"
  //   }

  //   return errors
  // }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
   validationSchema
    ,
    onSubmit:handleRegister
  })

  return <>
  {ApiError?<div className='w-1/2 mx-auto bg-red-700 text-white rounded-lg p-3 text-center'>{ApiError}</div>:null}
    <div className='my-5'>
      <h2 className='text-2xl font-bold text-emerald-600 mb-3'>Register Now</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
          <label htmlFor="name" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your name</label>
        </div>
   {formik.errors.name && formik.touched.name ?<div className="p-4 mb-4 text-sm text-red-600" role='alert' >
 {formik.errors.name}
</div>:null}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
          <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your email</label>
        </div>
        {formik.errors.email && formik.touched.email ?<div className="p-4 mb-4 text-sm text-red-600" role='alert' >
 {formik.errors.email}
</div>:null}
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
          <label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your phone</label>
        </div>
        {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-600" role='alert' >
 {formik.errors.phone}
</div>:null}
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
          <label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your password</label>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="p-4 mb-4 text-sm text-red-600" role='alert' >
 {formik.errors.password}
</div>:null}
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
          <label htmlFor="rePassword" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your password again</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ?<div className="p-4 mb-4 text-sm text-red-600" role='alert' >
 {formik.errors.rePassword}
</div>:null}
      <div className='flex gap-4 items-center'>
      <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{IsLoading?<i className='fas fa-spinner fa-spin'></i>:"register"}</button>
      <Link to={"/login"}><span className='text-blue-600 underline'>do you have an acount? login now</span></Link>
      </div>
      </form>

    </div>
  </>
}

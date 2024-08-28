import React, { useContext, useState } from 'react'

import { useFormik } from 'formik'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom';




export default function ResetPassword() {


  async function handlePassword(values){
    
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{email:formik.values.email,newPassword:formik.values.newPassword})
    .then((res)=>res)
    .catch((res)=>res)
    Navigate(`/login`)
  }




  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    }
    ,
    onSubmit:()=>handlePassword
  })

  return <>
  
    <div className='my-5'>
      <h2 className='text-center text-2xl font-bold text-emerald-600 mb-3'>Reset your password</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
          <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your email</label>
        </div>
       
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
          <label htmlFor="newPassword" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">enter your newPassword</label>
        </div>
       
      <div className='flex gap-4 items-center'>
      <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Reset your password</button>
      <Link to={"/register"}><span className='text-blue-600 underline'>dont you have an acount? Register now</span></Link>
      
      </div>
      </form>

    </div>
  </>
}


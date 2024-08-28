import React from 'react'
import style from "./ProtctedRoute.module.css"
import { Navigate } from 'react-router-dom'


export default function ProtctedRoute(props) {
 
 if(localStorage.getItem("userToken")){
  return props.children
 }
 else{
    return <Navigate to={"/login"}/>
 }
 
 
 
}

import React from 'react'
import style from "./Layout.module.css"
import Nacbar from './../Nacbar/Nacbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return<>
  <Nacbar/>
  <div className='container  p-10'>
    <Outlet/>
  </div>
  <Footer/>
  
  </>
}

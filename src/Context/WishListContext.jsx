import axios from "axios";
import { createContext, useEffect } from "react";







export let WishListContext=createContext()


export default function WishListContextProvider(props){
    let headers={token:localStorage.getItem("userToken")}




    function addProductToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }
    function getLoggedWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }
    function deleteWishList(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
    }


useEffect(()=>{
    getLoggedWishList()
},[])



    return <WishListContext.Provider value={{addProductToWishlist,getLoggedWishList,deleteWishList}}>
    {props.children}
</WishListContext.Provider>
}
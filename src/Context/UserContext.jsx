import { createContext, useContext, useEffect, useState } from "react";

export let UserContext=createContext()



export default function UserContextProvider(props){
const [userLogin, setUserLogin] = useState(
    localStorage.getItem("userToken")?localStorage.getItem("userToken"):null
)





// useEffect(function(){
// if(localStorage.getItem("userToken")){
//     setUserLogin(localStorage.getItem("userToken"))
// }
// },[])


    return<UserContext.Provider  value={{userLogin, setUserLogin}}>
      {props.children}
    </UserContext.Provider>
}
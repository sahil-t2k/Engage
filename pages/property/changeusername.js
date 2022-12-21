import React from 'react'
import UserProfileSidebar from "../../components/userprofilesidebar";
import UserProfileHeader from "../../components/userprofileheader";
import { useEffect, useState } from "react";
import Title from '../../components/title';
import axios from "axios";
import mode from '../../components/darkmode'
import Buttonloader from '../../components/loaders/buttonloader'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landingloader from "../../components/loaders/landingloader";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar"
const logger = require("../../services/logger");   
import DarkModeLogic from "../../components/darkmodelogic";
var language;
var currentUser;
const ChangeUsername=() =>{ 
  var locale;
  
  /** Router for Redirection **/
  const router = useRouter();

  /** State Intialisation for storing all Properties of Current User **/
 const [ownerdata, setOwnerdata] = useState([]);
 const [visible, setVisible] = useState(0);
 const [spinner, setSpinner] = useState(0)
 const [darkModeSwitcher, setDarkModeSwitcher] = useState()
 const [color, setColor] = useState({})
 const[modeChanger,setModeChanger] = useState("")
 
  useEffect(()=>{
    firstfun();
    if(JSON.stringify(currentUser)==='null'){
      router.push(window.location.origin)
    }    
    else{
   
    }
   
  },[])

  
  useEffect(()=>{ 
    setColor(DarkModeLogic(darkModeSwitcher))
   },[darkModeSwitcher])

  const firstfun=()=>{
    if (typeof window !== 'undefined'){
     locale = localStorage.getItem("Language");
     const colorToggle = JSON.parse(localStorage.getItem("ColorToggle"));
     const color = JSON.parse(localStorage.getItem("Color"));
     setColor(color);
     setDarkModeSwitcher(colorToggle)
        if (locale === "ar") {
      language = arabic;
      }
      if (locale === "en") {
      language=english;
      }
      if (locale === "fr") {
        language = french;
      }     
     currentUser = JSON.parse(localStorage.getItem("Signin Details"));   
     
    } 
  }

  const changeTheme = (props) => {
    localStorage.setItem("Mode", props)
   }
   return ( 
    <>
     <Title name={`Engage |  ${language?.landing}`}/>
     <UserProfileHeader color={color}/>
     <UserProfileSidebar  color={color} Primary={darkModeSwitcher} Sec={setDarkModeSwitcher}/>
     <div className={`min-h-screen ${color?.greybackground} p-4 `}>
     <div id="main-content"
            className={`${color?.greybackground} px-4 pt-24 py-2 relative overflow-y-auto lg:ml-96`}>
        <div className={`${color?.whitebackground} shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0`} >
          <div className="p-4 sm:p-8 lg:p-16 space-y-8">
            <h2 className={ `${color.text} text-2xl lg:text-2xl capitalize font-bold` }  >
             Change Username
            </h2>
            {/** Signin Form **/}
            <form className="mt-8 space-y-6" action="#">
              <div>
                <label
                  className={`${color?.text} text-base font-semibold block mb-2`}
                >
                 username
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={ `${color?.whitebackground} border border-gray-300 
                  ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
                   focus:border-cyan-600 block w-full p-2.5`}
                  onChange={(e) => {
                    setSigninDetails({
                      ...signinDetails,
                      email: e.target.value,
                    }),
                    setError({ ...error, email: '' })
                  }
                  }
               ></input>
              
              </div>
             
              <div className={spinner === 0 ? 'block' : 'hidden'}>
                <Button Primary={language?.Update}  />
              </div>
              <div className={spinner === 1 ? 'block' : 'hidden'}>
                <Button Primary={language?.UpdateSpinner} />
              </div>

             
            </form>
          </div>
        </div>

      
      </div>
    
      
    </div>
 </>)



}
export default ChangeUsername
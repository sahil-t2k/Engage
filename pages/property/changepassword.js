import React from 'react'
import UserProfileSidebar from "../../components/userprofilesidebar";
import bcrypt from "bcryptjs";
import validatechangePassword from '../../components/validation/changepassword';
import UserProfileHeader from "../../components/userprofileheader";
import { useEffect, useState } from "react";
import Title from '../../components/title';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar"
const logger = require("../../services/logger");
import DarkModeLogic from "../../components/darkmodelogic";
var language;
var currentUser;
const ChangePassword = () => {
  var locale;

  /** Router for Redirection **/
  const router = useRouter();

  /** State Intialisation for storing all Properties of Current User **/
  const [ownerdata, setOwnerdata] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [error, setError] = useState({})
  const [flag, setFlag] = useState([]);
  const [userDetails, setUserDetails] = useState({})
  const [signinDetails, setSigninDetails] = useState({})
  const [userFetchedDetails, setFetchedDetails] = useState({})
  const [visible, setVisible] = useState(0);
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [color, setColor] = useState({})
  const [modeChanger, setModeChanger] = useState("")

  useEffect(() => {
   
    if (JSON.stringify(currentUser) === 'null') {
      router.push(window.location.origin)
    }
    else {

    }
    firstfun();
  }, [])


  const firstfun = () => {
    if (typeof window !== 'undefined') {
     locale = localStorage.getItem("Language");
      const colorToggle = JSON.parse(localStorage.getItem("ColorToggle"));
      const color = JSON.parse(localStorage.getItem("Color"));
      setColor(color);
      setDarkModeSwitcher(colorToggle)
      if (locale === "ar") {
        language = arabic;
      }
      if (locale === "en") {
        language = english;
      }
      if (locale === "fr") {
        language = french;
      }

      fetchUserDetails();

    }
  }

  const changeTheme = (props) => {
    localStorage.setItem("Mode", props)
   
  }

  useEffect(() => {
    setColor(DarkModeLogic(darkModeSwitcher))
  }, [darkModeSwitcher])

  const fetchUserDetails = async () => {
    var item = {
      user_email: JSON.parse(localStorage.getItem("Signin Details"))?.email
    };
    axios.post("/api/signin/user", item, {
      headers: { "content-type": "application/json" },
    })
    .then((response) => {
      setUserDetails(response?.data);
      logger.info("url  to fetch user details hitted successfully")
      console.log(response.data)
    })
    .catch((error) => { logger.error("url to fetch user details, failed") });
  }

  /* Edit Basic Details Function */
  const submitUserpasswordEdit = async() => {
    if (flag === 1) {
      const EncryptedPass = await bcrypt.hash(signinDetails.new_password, userDetails?.salt);
      if (EncryptedPass !== userDetails.password) {
        const final_data = {
          "user_id": userDetails?.id,
          "user_password": EncryptedPass
        }
        const url = '/api/signup_user'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
          ((response) => {
            setSpinner(0);
            toast.success("API: Password update success.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            localStorage.setItem("Signin Details", JSON.stringify(userDetails));
            router.push("./changepassword");
            setFlag([]);

          })
          .catch((error) => {
            setSpinner(0)
            toast.error("API: Password update error.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
      }
      else{
        toast.warn('APP: The new password is the old one. ', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } 
    }

    else {
      toast.warn('APP: No change in userpassword detected. ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }

   // Add Validation Basic Details
   const validationChangePassword = () => {
    setError({})
    var result = validatechangePassword(signinDetails)
       console.log("Result" +JSON.stringify(result))
       if(result===true)
       {
       
        submitUserpasswordEdit();
       }
       else
       {
        setError(result)
       }
}
  return (
    <>
      <Title name={`Engage |  ${language?.landing}`} />
      <UserProfileHeader color={color} Primary={darkModeSwitcher} Sec={setDarkModeSwitcher}/>
      <UserProfileSidebar color={color} Primary={darkModeSwitcher} Sec={setDarkModeSwitcher} />
      <div className={`min-h-screen ${color?.greybackground} p-4 `}>
        <div id="main-content"
          className={`${color?.greybackground} px-4 pt-24 py-2 relative overflow-y-auto lg:ml-96`}>
          <div className={`${color?.whitebackground} shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0`} >
            <div className="p-4 sm:p-8 lg:p-16 space-y-8">
              <h2 className={`${color.text} text-2xl lg:text-2xl capitalize font-bold`}  >
                Change Password
              </h2>
              {/** Signin Form **/}
              <form className="mt-8 space-y-6" action="#">
                <div>
                  <label
                    className={`${color?.text} text-base font-semibold block mb-2`}>
                    old password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={
                      (e) => (
                        setSigninDetails({ ...signinDetails, old_password: e.target.value }, setFlag(1))
                      )
                    }
                    className={`${color.whitebackground} border border-gray-300 
                  ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
                   focus:border-cyan-600 block w-full p-2.5`}
                  ></input>
                   <p className="text-sm text-sm text-red-700 font-light">
                          {error?.old_password}</p>
                </div>
                <div>
                  <label
                    className={`${color?.text} text-base font-semibold block mb-2`}
                  >
                    new password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={
                      (e) => (
                        setSigninDetails({ ...signinDetails, new_password: e.target.value }, setFlag(1))
                      )
                    }
                    className={`${color.whitebackground} border border-gray-300 
                  ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
                   focus:border-cyan-600 block w-full p-2.5`}
                  ></input>
                 <p className="text-sm text-sm text-red-700 font-light">
                          {error?.new_password}</p>
                </div>
                <div>
                  <label
                    className={`${color?.text} text-base font-semibold block mb-2`}
                  >
                    confirm new password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={
                      (e) => (
                        setSigninDetails({ ...signinDetails, confirm_password: e.target.value }, setFlag(1))
                      )
                    }
                    className={`${color.whitebackground} border border-gray-300 
                  ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
                   focus:border-cyan-600 block w-full p-2.5`}
                  ></input>
                  <p className="text-sm text-sm text-red-700 font-light">
                          {error?.confirm_password}</p>
                </div>

                <div id="btn" className="flex  items-center justify-end space-x-2 sm:space-x-3 ">
                  <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                    <Button Primary={language?.UpdateDisabled} /></div>
                  <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                    <Button Primary={language?.Update} onClick={validationChangePassword} />
                  </div>
                  <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
                    <Button Primary={language?.SpinnerUpdate} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>)
}
export default ChangePassword
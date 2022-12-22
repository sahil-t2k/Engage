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
const ChangePassword = () => {
  var locale;

  /** Router for Redirection **/
  const router = useRouter();

  /** State Intialisation for storing all Properties of Current User **/
  const [ownerdata, setOwnerdata] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [flag, setFlag] = useState([]);
  const [userDetails, setUserDetails] = useState({})
  const [visible, setVisible] = useState(0);
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [color, setColor] = useState({})
  const [modeChanger, setModeChanger] = useState("")

  useEffect(() => {
    firstfun();
    if (JSON.stringify(currentUser) === 'null') {
      router.push(window.location.origin)
    }
    else {

    }
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

      currentUser = JSON.parse(localStorage.getItem("Signin Details"));
      setUserDetails(JSON.parse(localStorage.getItem("Signin Details")))

    }
  }

  const changeTheme = (props) => {
    localStorage.setItem("Mode", props)
  }

  useEffect(() => {
    setColor(DarkModeLogic(darkModeSwitcher))
  }, [darkModeSwitcher])

  /* Edit Basic Details Function */
  const submitUserpasswordEdit = () => {
    if (flag === 1) {
      if (objChecker.isEqual(currentUser, userDetails)) {
        toast.warn('APP: No change in userpassword detected. ', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,

        });
        setFlag([]);
      }
      else {
        setSpinner(1)
        const final_data = {
          "user_id": userDetails?.id,
          "user_password": userDetails?.password
        }
        alert(JSON.stringify(final_data))
        const url = '/api/signup_user'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
          ((response) => {
            setSpinner(0);
            toast.success("API: Userpassword update success.", {
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
            toast.error("API: Userpassword update error.", {
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
  return (
    <>
      <Title name={`Engage |  ${language?.landing}`} />
      <UserProfileHeader color={color} />
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
                    className={`${color?.text} text-base font-semibold block mb-2`}
                  >
                    old password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"

                    className={`${color.whitebackground} border border-gray-300 
                  ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
                   focus:border-cyan-600 block w-full p-2.5`}
                  ></input>

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

                    className={`${color.whitebackground} border border-gray-300 
                  ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
                   focus:border-cyan-600 block w-full p-2.5`}
                  ></input>

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
                        setUserDetails({ ...userDetails, password: e.target.value }, setFlag(1))
                      )
                    }
                    className={`${color.whitebackground} border border-gray-300 
                  ${color?.text}  sm:text-sm rounded-lg focus:ring-cyan-600
                   focus:border-cyan-600 block w-full p-2.5`}
                  ></input>

                </div>

                <div id="btn" className="flex  items-center justify-end space-x-2 sm:space-x-3 ">
                  <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                    <Button Primary={language?.UpdateDisabled} /></div>
                  <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                    <Button Primary={language?.Update} onClick={submitUserpasswordEdit} />
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
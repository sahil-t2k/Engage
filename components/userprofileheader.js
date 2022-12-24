import React, { useState, useEffect } from 'react';
import DarkModeLogic from "./darkmodelogic";
import english from "./Languages/en";
import french from "./Languages/fr";
import arabic from "./Languages/ar";
import { useRouter } from "next/router";
import Link from 'next/link';
var language;
var currentLogged;

function UserProfileHeader(args) {
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [userProfile, setUserProfile] = useState(false)
  const [flag, setFlag] = useState(false)
  const [modeChanger, setModeChanger] = useState("")
  const [color, setColor] = useState({})

  useEffect(() => {
    const firstfun = () => {
      if (typeof window !== 'undefined') {
       
        var locale = localStorage.getItem("Language");

        if (locale === "ar") {
          language = arabic;
        }
        if (locale === "en") {
          language = english;
        }
        if (locale === "fr") {
          language = french;
        }

      }
    }
    firstfun();
    currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
  }, [])
  /** UseState to check whether its small screen or large screen **/
  const [smSidebar, setSmSidebar] = useState(false)
  const router = useRouter();

 
  return (
    <div>
      {/** Header **/}
      <nav className={`${args?.color?.whitebackground} px-2 border-b border-gray-200 fixed z-30 w-full`}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className={smSidebar === false ? 'block' : 'hidden'}>
                <button onClick={() => setSmSidebar(true)} aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <svg className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button></div>
              <div className={smSidebar === true ? 'block' : 'hidden'}>
                <button id="toggleSidebarMobile" onClick={() => setSmSidebar(false)} aria-expanded="true" aria-controls="sidebar"
                  className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg id="toggleSidebarMobileHamburger" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <svg id="toggleSidebarMobileClose" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <li className="text-2xl text-cyan-600 font-bold flex items-center lg:ml-2.5">
                <span className="self-center whitespace-nowrap">enGage</span>
              </li>
              <form action="#" method="GET" className="hidden lg:block lg:pl-40">
                <label htmlFor="topbar-search" className="sr-only">{language?.search}</label>
                <div className="mt-1 relative lg:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 ${args?.color?.textgray}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                  <input type="text" name="email" id="topbar-search" className={`${args?.color?.greybackground} border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5`}
                    placeholder={language?.search} />
                </div>
              </form>
            </div>


            {/** Button for Sign out**/}

            {/* <button
                  className="bg-cyan-600 bg-opacity-100 float-right ml-5 text-white 
              hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold 
              rounded-lg text-sm px-4 py-2 text-center  mr-2"
                  onClick={() => {
                     router.push("/");
                     localStorage.removeItem("property");
                     localStorage.removeItem("Signin Details");  
                    //localStorage.clear();
                  }}
                  type="button"
                >
                  {language?.signout}
                </button> */}


            <button id="dropdownInformationButton" onClick={() => { setFlag(!flag) }} data-dropdown-toggle="dropdownInformation"
              className="bg-cyan-600 bg-opacity-100  flex float-right ml-5 text-white 
  hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-semibold rounded-full
  rounded-lg text-sm mr-8 px-3 py-3 text-center " type="button">
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><g><path d="M4,18v-0.65c0-0.34,0.16-0.66,0.41-0.81C6.1,15.53,8.03,15,10,15c0.03,0,0.05,0,0.08,0.01c0.1-0.7,0.3-1.37,0.59-1.98 C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V20h9.26c-0.42-0.6-0.75-1.28-0.97-2H4z" /><path d="M10,12c2.21,0,4-1.79,4-4s-1.79-4-4-4C7.79,4,6,5.79,6,8S7.79,12,10,12z M10,6c1.1,0,2,0.9,2,2s-0.9,2-2,2 c-1.1,0-2-0.9-2-2S8.9,6,10,6z" /><path d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l1.14-1.01l-1-1.73l-1.45,0.49c-0.32-0.27-0.68-0.48-1.08-0.63L18,11h-2l-0.3,1.49 c-0.4,0.15-0.76,0.36-1.08,0.63l-1.45-0.49l-1,1.73l1.14,1.01c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-1.14,1.01 l1,1.73l1.45-0.49c0.32,0.27,0.68,0.48,1.08,0.63L16,21h2l0.3-1.49c0.4-0.15,0.76-0.36,1.08-0.63l1.45,0.49l1-1.73l-1.14-1.01 C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,18,17,18z" /></g></g></svg>
            
            </button>
          </div>

          <div className="ml-0 flex justify-end ">
            <div id="dropdownInformation" className={flag === true ? `${args?.color?.whitebackground} absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow 
dark:bg-gray-700 dark:divide-gray-6001`: 'hidden'}>
              <div className={`${args?.color?.text} py-3 px-4 text-sm `}>
                <div className='capitalize'>{currentLogged?.name}</div>
                <div className="font-medium truncate">{currentLogged?.email}</div>
              </div>
              <ul className={`${args?.color?.crossbg} py-1 text-sm`} >
                <li>
                  <a href="#" className={`${args?.color?.sidebar} block py-2 px-4  ${args?.color?.footerhover}`}>User Profile</a>
                </li>
                <li>
                  <a className={`${args?.color?.sidebar} block py-2 px-4 ${args?.color?.footerhover}`}>
                    <button onClick={() => {
                      router.push("/");
                      localStorage.removeItem("property");
                      localStorage.removeItem("Signin Details");
                      //localStorage.clear();
                    }} >
                      Sign out</button></a>
                </li>
              </ul>

            </div></div>
        </div>

      </nav>

      {/** Sidebar for small screens **/}
      <div className={smSidebar === true ? "block" : "hidden"}>
        <aside id="sidebar" className="fixed lg:hidden z-20 h-full top-0 left-0 pt-16 flex sm:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
          <div className={`${args?.color?.whitebackground} relative flex-1 flex flex-col min-h-0 border-r border-gray-200  pt-0`}>
            <div className="flex-1 flex flex-col  pb-4 overflow-y-auto">
              <div className={`${args?.color?.whitebackground}  flex-1 py-4 px-3 divide-y space-y-1`}>
                <ul className="space-y-2 pb-2">
                  <li>
                    <form action="#" method="GET" className="lg:hidden">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div
                          className="absolute inset-y-0 left-0 pl-3 flex items-center 
                       pointer-events-none"
                        ></div>
                      </div>
                    </form>
                  </li>
                  <li className={`${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal rounded-lg flex items-center p-2`}>
                    <svg
                      className={`w-6 h-6 ${args?.color?.textgray} flex-shrink-0  ${args?.color?.iconhover} transition duration-75`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>

                    <span className="ml-3">
                      <Link href="./landing">List of Properties</Link></span>
                  </li>

                  <li onClick={() => { setUserProfile(!userProfile); }} className={`${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal rounded-lg flex items-center p-2 `}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className={`w-6 h-6 ${args?.color?.textgray} flex-shrink-0 ${args?.color?.iconhover} transition duration-75  `}
                      fill="currentColor"
                      viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>

                    <span className="ml-3 flex-1 whitespace-nowrap">
                     User Profile Settings</span>
                  </li>

                  <div className={userProfile === true ? 'block' : 'hidden'}>
                    <ul className="py-2 space-y-2">
                      <li className={`${args?.color?.text}  text-base font-normal rounded-lg flex items-center p-2 pl-11`}
                      >
                        <Link href="./changeusername">
                          <a>Change Username</a></Link>
                      </li>
                      <li className={`${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal rounded-lg flex items-center p-2 pl-11`}>
                        <Link href={"./changepassword"}>
                           Change Password </Link></li>
                    </ul></div>

                  <li onClick={() => { args?.Sec(!args?.Primary); }} className={`${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal rounded-lg flex items-center p-2  `}>
                    {args?.Primary == false ?
                      <svg xmlns="http://www.w3.org/2000/svg"
                        className={`w-6 h-6 ${args?.color?.textgray} flex-shrink-0  ${args?.color?.iconhover} transition duration-75`}
                        fill="currentColor" enableBackground="new 0 0 20 20" viewBox="0 0 20 20"><rect fill="none" height="20" width="20" /><path d="M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z" /></svg>
                      : <svg className={`w-6 h-6 ${args?.color?.textgray} flex-shrink-0  ${args?.color?.iconhover} transition duration-75`}
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" viewBox="0 0 20 20"><rect fill="none" height="20" width="20" /><path d="M10,7.5c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5S7.5,11.38,7.5,10S8.62,7.5,10,7.5z M10,6c-2.21,0-4,1.79-4,4s1.79,4,4,4 s4-1.79,4-4S12.21,6,10,6L10,6z M3.75,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2C1.34,9.25,1,9.59,1,10 s0.34,0.75,0.75,0.75H3.75z M18.25,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2c-0.41,0-0.75,0.34-0.75,0.75 s0.34,0.75,0.75,0.75H18.25z M9.25,3.75C9.25,4.16,9.59,4.5,10,4.5c0.41,0,0.75-0.34,0.75-0.75v-2C10.75,1.34,10.41,1,10,1 S9.25,1.34,9.25,1.75V3.75z M13.89,5.05c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06c0.29-0.29,0.29-0.77,0-1.06 c-0.29-0.29-0.77-0.29-1.06,0L13.89,5.05z M3.99,14.95c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06 c0.29-0.29,0.29-0.77,0-1.06c-0.29-0.29-0.77-0.29-1.06,0L3.99,14.95z M5.05,6.11c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 L5.05,3.99c-0.29-0.29-0.77-0.29-1.06,0s-0.29,0.77,0,1.06L5.05,6.11z M14.95,16.01c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 l-1.06-1.06c-0.29-0.29-0.77-0.29-1.06,0c-0.29,0.29-0.29,0.77,0,1.06L14.95,16.01z M9.25,18.25C9.25,18.66,9.59,19,10,19 c0.41,0,0.75-0.34,0.75-0.75v-2c0-0.41-0.34-0.75-0.75-0.75s-0.75,0.34-0.75,0.75V18.25z" /></svg>
                    } <span className="ml-3 flex-1 whitespace-nowrap">
                      <Link href={{ pathname: args?.Primary?.basicdetails, query: { id: 1 } }}><a>
                        {args?.Primary == false ? <>  Dark Mode</> : <>Light Mode</>}
                      </a></Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default UserProfileHeader
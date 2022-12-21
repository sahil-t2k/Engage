import React, { useEffect, useState } from "react";
import DarkModeLogic from "./darkmodelogic";
import DarkModeToggle from "./darkmodetoggle";
import english from "./Languages/en";
import french from "./Languages/fr";
import arabic from "./Languages/ar";
import Link from 'next/link'
var language;


const UserProfileSidebar = (args) => {
  const [darkModeSwitcher, setDarkModeSwitcher] = useState()
  const [userProfile, setUserProfile] = useState(false)
  const [color, setColor] = useState({})
  const [modeChanger, setModeChanger] = useState("")

  useEffect(() => {
    firstfun();

  }, [])

  useEffect(() => {
    setColor(DarkModeLogic(darkModeSwitcher))
  }, [darkModeSwitcher])

  const firstfun = () => {
    if (typeof window !== 'undefined') {
      var locale = localStorage.getItem("Language");
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
    }
  }
  return (
    <div
      id="sidebar"
      className="hidden  fixed z-20 h-full 
      top-0 left-0 pt-16  lg:flex flex-shrink-0 flex-col w-64 
      transition-width duration-75"
      aria-label="Sidebar"
    >
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
                  <Link href={"./landing"}>List of Properties</Link></span>
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
                  <li className={`${args?.color?.text}  text-base font-normal rounded-lg flex items-center p-2 pl-11`}>
                    <Link href={"./changeusername"}>
                      Change Username</Link>
                  </li>
                  <li className={`${args?.color?.text} ${args?.color?.sidebar} group text-base font-normal rounded-lg flex items-center p-2 pl-11`}>
                    <Link href={"./changepassword"}>
                       Change Password
                    </Link></li>
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
    </div>
  );
};
export default UserProfileSidebar;

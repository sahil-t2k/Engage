// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react'
// // must go before plugins
// // import dayGridPlugin from '@fullcalendar/daygrid'
// import UserProfileSidebar from "../../components/userprofilesidebar";
// import UserProfileHeader from "../../components/userprofileheader";
// import english from "../../components/Languages/en"
// import french from "../../components/Languages/fr"
// import arabic from "../../components/Languages/ar"
// const logger = require("../../services/logger");
// import { useRouter } from "next/router";
// import colorFile from '../../components/color'
// var language;
// var currentUser;
// let currentLogged;
// let colorToggle;
// var locale;

// function Calendar() {
//   const [scheduleObj, setScheduleObj] = useState();
//   const [color, setColor] = useState({})
//   const [modeChanger, setModeChanger] = useState("")
//   const [mode, setMode] = useState()

//   /** Router for Redirection **/
//   const router = useRouter();
//   useEffect(() => {
//     firstfun();
//   }, [])

//   const firstfun = async () => {
//     if (typeof window !== 'undefined') {
//       locale = localStorage.getItem("Language");
//       colorToggle = localStorage.getItem("colorToggle");
//       if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
//         setColor(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? colorFile?.dark
//           : colorFile?.light);
//         setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true
//           : false);
//       }
//       else if (colorToggle === "true" || colorToggle === "false") {
//         setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light)
//         setMode(colorToggle === "true" ? true : false);

//       }

//       {
//         if (locale === "ar") {
//           language = arabic;
//         } else if (locale === "en") {
//           language = english;
//         } else if (locale === "fr") {
//           language = french;
//         }
//       }
//       currentUser = JSON.parse(localStorage.getItem("Signin Details"));
//       currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
//     }
//   }

//   const colorToggler = (newColor) => {
//     if (newColor === 'system') {
//       window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
//         : setColor(colorFile?.light)
//       localStorage.setItem("colorToggle", newColor)
//     }
//     else if (newColor === 'light') {
//       setColor(colorFile?.light)
//       localStorage.setItem("colorToggle", false)
//     }
//     else if (newColor === 'dark') {
//       setColor(colorFile?.dark)
//       localStorage.setItem("colorToggle", true)
//     }
//     firstfun();
//     router.push('./calendar')
//   }

//   const change = (args) => {
//     scheduleObj.selectedDate = args.value;
//     scheduleObj.dataBind();
//   };

//   const onDragStart = (arg) => {
//     arg.navigation.enable = true;
//   };


//   return (
//     <>
//       <UserProfileHeader color={color} Primary={color?.name} Sec={colorToggler} mode={mode} setMode={setMode} />
//       <UserProfileSidebar color={color} Primary={color?.name} Sec={colorToggler} colorToggle={colorToggle} />
//       <div
//         id="main-content"
//         className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64 px-2 py-2`}>
//         <FullCalendar
//           events={[
//             { title: 'event 1', date: '2023-04-01' },
//             { title: 'event 2', date: '2023-02-02' }
//           ]}
         
//           initialView="dayGridMonth"
//         /></div>
//     </>
//   )
// }

// export default Calendar

import React from 'react'

function calendar() {
  return (
    <div>calendar</div>
  )
}

export default calendar
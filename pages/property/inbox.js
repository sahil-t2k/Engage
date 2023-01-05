import React, { useState, useEffect } from 'react';
import colorFile from '../../components/color';
import Router from 'next/router'
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar";
import Title from '../../components/title';
var language;
var currentLogged;
let colorToggle;

function Inbox() {
    const [color, setColor] = useState({})
    const[mode,setMode] = useState()

    useEffect(() => {
        firstfun();
    }, [])

    const firstfun = () => {
        if (typeof window !== 'undefined') {
            var locale = localStorage.getItem("Language");
            colorToggle = localStorage.getItem("colorToggle");
           
            if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
                window.matchMedia("(prefers-color-scheme:dark)").matches === true ?
                 setColor(colorFile?.dark) : setColor(colorFile?.light);
                 setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
            }
            else if (colorToggle === "true" || colorToggle === "false") {
                setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
                setMode(colorToggle === "true" ? true : false)
                
            }
            {
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
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
        }
    }

    const colorToggler = (newColor) => {
        if (newColor === 'system') {
          window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
          : setColor(colorFile?.light)
          localStorage.setItem("colorToggle", newColor)
        }
        else if (newColor === 'light') {
          setColor(colorFile?.light)
          localStorage.setItem("colorToggle", false)
        }
        else if (newColor === 'dark') {
          setColor(colorFile?.dark)
          localStorage.setItem("colorToggle", true)
        }
       firstfun();
       Router.push('./inbox')
      }
    const readMessage = () => {
        Router.push("./inbox/readmessage")
    }
    return (
        <>
            <Title name={`Engage |  ${language?.inbox}`} />

            <Header color={color} Primary={english?.Side} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode}/>
            <Sidebar color={color} Primary={english?.Side} Type={currentLogged?.user_type} />

            <div id="main-content" className={`${color?.whitebackground} min-h-screen pt-20  relative overflow-y-auto lg:ml-64`}>
                <div className={`${color?.whitebackground} px-4 sticky pt-2 sm:flex items-center w-full sm:justify-between bottom-0 right-0 `}>

                    <div className="flex space-x-1 pl-0 sm:pl-4  sm:mt-0">
                        <div className="border-r   border-gray-200">
                            <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" mr-4 -ml-1 w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                          dark:ring-offset-gray-800 focus:ring-2 mt-2  dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                        <button data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text}  mr-2 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                        </span>
                        <div className="border-l mx-4  border-gray-200">
                            <button type="button" data-modal-toggle="add-user-modal" className="mx-4 w-1/2  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-4 py-2 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                <Link href="./inbox/composemessage"> Compose </Link>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center mr-2 mb-4 sm:mb-0">
                        <svg className={`w-6 h-6 ${color?.textgray} flex-shrink-0 hover:${color?.tableheader} transition duration-75`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <a href="#" className={` ${color?.deltext}  hover:${color?.tabletext} cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href="#" className={` ${color?.deltext}  hover:${color?.tabletext} cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2`}>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <span className={` ${color?.deltext} text-sm font-normal text-gray-500`}>Showing <span className={` ${color?.deltext}text-gray-900 font-semibold">1-20</span> of <span className="text-gray-900 font-semibold`}>2290</span></span>
                    </div>

                </div>

                <div className={`hover:${color?.tableheader} divide-y mt-1.5 whitespace-nowrap border-t border-gray-200`}></div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden">
                                <table className="table-fixed min-w-full divide-y divide-gray-200">
                                    <tbody className="divide-y divide-gray-200 ">
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  cursor-pointer hover:text-yellow-400 ${color?.textgray} flex-shrink-0  ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div onClick={() => readMessage()} className={`text-md pr-6 font-semibold cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...</td>
                                            <td className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  cursor-pointer hover:text-yellow-400 ${color?.textgray} flex-shrink-0  ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div onClick={() => readMessage()} className={`text-md pr-6 font-semibold cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...</td>
                                            <td className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  cursor-pointer hover:text-yellow-400 ${color?.textgray} flex-shrink-0  ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div onClick={() => readMessage()} className={`text-md pr-6 font-semibold cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...</td>
                                            <td className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  cursor-pointer hover:text-yellow-400 ${color?.textgray} flex-shrink-0  ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className="px-2 py-3 flex items-center cursor-pointer whitespace-nowrap space-x-4  lg:mr-0">
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div onClick={() => readMessage()} className={`text-md pr-6 font-semibold cursor-pointer whitespace-nowrap ${color?.tabletext} `}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...</td>
                                            <td className={`${color?.tabletext} px-4 py-3 font-semibold whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>

                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  hover:text-yellow-400 ${color?.textgray} flex-shrink-0 cursor-pointer ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className={` px-2 py-3 flex items-center whitespace-nowrap space-x-4 cursor-pointer lg:mr-0`}>
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div className={`${color?.tabletext} text-md pr-6 whitespace-nowrap`}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 cursor-pointer whitespace-nowrap space-x-2`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...
                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  hover:text-yellow-400 ${color?.textgray} flex-shrink-0 cursor-pointer ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className={` px-2 py-3 flex items-center whitespace-nowrap space-x-4 cursor-pointer lg:mr-0`}>
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div className={`${color?.tabletext} text-md pr-6  whitespace-nowrap`}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 cursor-pointer whitespace-nowrap space-x-2`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...
                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  hover:text-yellow-400 ${color?.textgray} flex-shrink-0 cursor-pointer ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className={` px-2 py-3 flex items-center whitespace-nowrap space-x-4 cursor-pointer lg:mr-0`}>
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div className={`${color?.tabletext} text-md pr-6  whitespace-nowrap`}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 cursor-pointer whitespace-nowrap space-x-2`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...
                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  hover:text-yellow-400 ${color?.textgray} flex-shrink-0 cursor-pointer ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className={` px-2 py-3 flex items-center whitespace-nowrap space-x-4 cursor-pointer lg:mr-0`}>
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div className={`${color?.tabletext} text-md pr-6  whitespace-nowrap`}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 cursor-pointer whitespace-nowrap space-x-2`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...
                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                        <tr  className={`hover:${color?.tableheader}`}>
                                            <td className="px-4 py-3 w-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" w-4 h-4 rounded text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                 dark:ring-offset-gray-800 focus:ring-2 mx-3  dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 mx-1  hover:text-yellow-400 ${color?.textgray} flex-shrink-0 cursor-pointer ${color?.iconhover} transition duration-75`}
                                                        fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                                </div>
                                            </td>
                                            <td onClick={() => readMessage()} className={` px-2 py-3 flex items-center whitespace-nowrap space-x-4 cursor-pointer lg:mr-0`}>
                                                <div className="flex-shrink-0 whitespace-nowrap">
                                                    <img className="h-6 w-6 rounded" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                                </div>

                                                <div className={`${color?.tabletext} text-md pr-6  whitespace-nowrap`}>
                                                    Neil Sims
                                                </div>

                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 cursor-pointer whitespace-nowrap space-x-2`}> Am no an listening depending up believing. Enough around remove to barton agreed regret in...
                                            </td>
                                            <td onClick={() => readMessage()} className={`${color?.tabletext} px-4 py-3 whitespace-nowrap space-x-2 cursor-pointer`}>
                                                10 April at 15.28 PM
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Inbox
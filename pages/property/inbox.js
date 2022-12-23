import React, { useState, useEffect } from 'react';
import DarkModeLogic from "../../components/darkmodelogic";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar";
import Title from '../../components/title';
var language;
var currentLogged;

function Inbox() {
    const [darkModeSwitcher, setDarkModeSwitcher] = useState()
    const [color, setColor] = useState({})

    useEffect(() => {
        firstfun();
    }, [])

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
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
        }
    }

    useEffect(() => {
        setColor(DarkModeLogic(darkModeSwitcher))
    }, [darkModeSwitcher])
    return (
        <>
            <Title name={`Engage |  ${language?.inbox}`} />

            <Header color={color} Primary={english?.Side} Type={currentLogged?.user_type} />
            <Sidebar color={color} Primary={english?.Side} Type={currentLogged?.user_type} />
            <div
                id="main-content"
                className={`${color?.whitebackground} min-h-screen pt-24 px-2 relative overflow-y-auto lg:ml-64`}>
                 <div className={`${color?.whitebackground} sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 `}>
         
                    <div className="flex space-x-1 pl-0 sm:pl-2  sm:mt-0">
                    <div className="border-r   border-gray-200">
                        <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" name="allSelect" className=" mr-4 w-4 h-4 rounded-full text-cyan-600 bg-gray-100  border-gray-300 focus:ring-cyan-500 dark:focus:ring-blue-600 
                          dark:ring-offset-gray-800 focus:ring-2 mt-2  dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                       
                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer mr-2 p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                        </span>

                        <button data-tooltip="Delete" aria-label="Delete" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </button>

                        <span className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </span>
                        <span className={`${color?.textgray} hover:${color?.text}  mr-2 cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                        </span>
                        <div className="border-l mx-4  border-gray-200">
                        <button type="button" data-modal-toggle="add-user-modal" className="mx-4 w-1/2  text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-4 py-2 text-center sm:w-auto">
                            <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Compose
                        </button>
                        </div>
                    </div>



                    <div className="flex items-center mr-2 mb-4 sm:mb-0">
                        <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                        <span className="text-sm font-normal text-gray-500">Showing <span className="text-gray-900 font-semibold">1-20</span> of <span className="text-gray-900 font-semibold">2290</span></span>
                    </div>
                </div>

{/* <tr className="hover:bg-gray-100">
<td className="py-2 w-4">
<div className="flex items-center">
<input id="checkbox-7" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
<label htmlFor="checkbox-7" className="sr-only">checkbox</label>
</div>
</td>
<td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
<img className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/helene-engels.png" alt="Helene Engels avatar"/>
<div className="text-sm font-normal text-gray-500">
<div className="text-base font-semibold text-gray-900">Helene Engels</div>
<div className="text-sm font-normal text-gray-500">
    </div>
</div>
</td>
<td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Product owner</td>
<td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">Canada</td>

<td className="p-4 whitespace-nowrap space-x-2">
<button type="button" data-modal-toggle="user-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
<svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
Edit user
</button>
<button type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
<svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
Delete user
</button>
</td>
</tr> */}
            </div>

        </>
    )
}

export default Inbox
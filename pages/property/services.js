import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import LoaderDarkTable from "../../components/loaders/darktableloader";
import colorFile from "../../components/color";
import Header from "../../components/Header";
import Link from "next/link";
import Table from '../../components/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import english from "../../components/Languages/en"
import french from "../../components/Languages/fr"
import LoaderTable from "../../components/loadertable";
import Headloader from "../../components/loaders/headloader";
const logger = require("../../services/logger");
var language;
var currentProperty;
var propertyName;
var propertyId;
import Router from 'next/router';
import arabic from "../../components/Languages/ar";
var currentLogged;
import objChecker from "lodash";
let colorToggle;

function Services() {
    const [visible, setVisible] = useState(0)
    const [services, setServices] = useState([])
    const [edit, setEdit] = useState(0)
    const [color, setColor] = useState({})
    const [view, setView] = useState(0);
    const[mode,setMode] = useState()
    const [modified, setModified] = useState([])
    const [addEdit, setAddEdit] = useState(0)
    const [addDel, setAddDel] = useState(0)
    const [add, setAdd] = useState(0)
    const [gen, setGen] = useState([])
    const [gene, setGene] = useState([])
    const [finalServices,setFinalServices]=useState([])
    const [uServices,setUServices]=useState([])

    //creates json to be edited and sent to db
    const makefinal = (arg) =>{
      var intermediate=[]
      arg.map((item,index)=>{
        var temp={"service_id":item.service_id,
          "property_id":currentProperty?.property_id,
          "local_service_name":item.service_name.replaceAll("_"," "),
          "service_value":"no",
          "service_comment":"",
          "status":true,
          "index":index
      }
      intermediate.push(temp)
    })
      setFinalServices(intermediate)
    }
    //fetches all services
    const fetchServices = () => {
      const url=`/api/services`;
      axios.get(url).then((response)=>
      {
        setVisible(1)
        setServices(response.data)
        uServices(response.data)
        logger.info("All services fetched")
       
        makefinal(response.data)
        
     
      }).catch(error=>{
        logger.error(error)
      })
    }

    useEffect(() => {
        firstfun();
    }, [])

    const firstfun = () => {
        if (typeof window !== 'undefined') {
            var locale = localStorage.getItem("Language");
            colorToggle = localStorage.getItem("colorToggle");
            if(colorToggle === "" || colorToggle === undefined ||  colorToggle ===null ||colorToggle === "system"){
              window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) :setColor(colorFile?.light) 
              setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
            }
           else if(colorToggle === "true" || colorToggle === "false") {
             setColor(colorToggle=== "true" ? colorFile?.dark: colorFile?.light);
             setMode(colorToggle === "true" ? true : false)
           } 
           { if (locale === "ar") {
                language = arabic;
            }
            if (locale === "en") {
                language = english;
            }
            if (locale === "fr") {
                language = french;
            }}
            /** Current Property Details fetched from the local storage **/
            currentProperty = JSON.parse(localStorage.getItem("property"));
            currentLogged = JSON.parse(localStorage.getItem("Signin Details"));
        }
    }

    /* Function call to fetch Current Property Details when page loads */
    const fetchHotelDetails = async () => {
        var genData = [];
        const url = `/api/${currentProperty.address_province.replace(
            /\s+/g,
            "-"
        )}/${currentProperty.address_city}/${currentProperty.property_category
            }s/${currentProperty?.property_id}`;
        axios.get(url)
            .then((response) => {
              if (response?.data.services === undefined || response?.data.services === "") {fetchServices(); }
              else if (response?.data.services != undefined && response?.data.services != ""){
                setServices(response.data);
                logger.info("url  to fetch property details hitted successfully")
                setVisible(1)
                {
                    response.data?.services?.map((item) => {
                        var temp = {
                            name: item.local_service_name,
                            description: item.service_comment,
                            type: item.service_value,
                            status: item.status,
                            id: item.service_id
                        }
                        genData.push(temp)
                    })
                    setGen(genData);
                }
              }

            })

            .catch((error) => { logger.error("url to fetch property details, failed") });
    }

    useEffect(() => {
        if(JSON.stringify(currentLogged)==='null'){
            Router.push(window.location.origin)
          }    
          else{
            fetchHotelDetails();
          }
    }, [])

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
       Router.push('./services')
      }

       
    /* Function to edit services*/
    const updateServices = (props,noChange) => {
        if(objChecker.isEqual(props,noChange)){
            toast.warn('No change in Services detected. ', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
     else{
        const final_data = {
            "service_id": props.id,
            "property_id": currentProperty?.property_id,
            "service_value": props.type,
            "status": props.status
        }
        const url = '/api/services'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
            ((response) => {
                toast.success("Services Updated Successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                fetchHotelDetails();
                Router.push("./services");

            })
            .catch((error) => {
                toast.error("Service Update Error!", {
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
    
//send services to db
const submitServices = () =>{
  console.log("in submit services");
  const final={"services_link":finalServices}
  console.log(JSON.stringify(finalServices))
  const url=`/api/services`
  axios.post(url,JSON.stringify(final),{
    headers: {
      	'Content-Type': 'application/json'
  	}}

  ).then((response)=>{
    console.log(response.data);
    toast.success("Services add success.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    fetchHotelDetails()
    Router.push("./services");
  }).catch((error)=>{
    toast.error(error.message, {
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

    return (
        <>
            <Header color={color} Primary={english?.Side} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode}/>
            <Sidebar color={color} Primary={english?.Side} Type={currentLogged?.user_type}/>
            <div id="main-content"
                className={`${color?.whitebackground} min-h-screen pt-24 relative overflow-y-auto lg:ml-64`}>
                {/* Navbar */}
                <nav className="flex mb-5 ml-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
              <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <Link href={currentLogged?.id.match(/admin.[0-9]*/) ? "../admin/AdminLanding" : "./landing"} 
                className={`${color?.text} text-base font-medium  inline-flex items-center`}><a>{language?.home}</a>
                </Link></div>
              </li>
              <li>
                <div className="flex items-center">
                <div className={`${color?.text} text-base font-medium capitalize  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="./propertysummary" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                    <a>{currentProperty?.property_name}</a>
                  </Link>
                  </div></div>

                </div>
              </li>
              <li>
                <div className="flex items-center">
                <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.services}</span>
                </div>
                </div>
              </li>
            </ol>
          </nav>
          <div className={(visible === 0 && colorToggle == false ? 'block' : 'hidden')}><LoaderTable /></div>
        <div className={(visible === 0 && colorToggle == true ? 'block' : 'hidden')}><LoaderDarkTable /></div>
                <div className={visible === 1 ? 'block' : 'hidden'}>

               {uServices.length == 0 ?
              <>
              <div className="mx-4">
                <h1 className={`text-xl sm:text-2xl font-semibold ${color?.text}`}>
        {language?.services}
        </h1>
<div className="sm:flex ">
<div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
<form className="lg:pr-3" action="#" method="GET">
<label htmlFor="users-search" className="sr-only">Search</label>
 <div className="mt-1 relative lg:w-64 xl:w-96">
<input type="text" name="email" id="users-search"
 className={`${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder="Search for services"/>
</div>
</form>
<div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
<a href="#" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
</a>
<a href="#" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
</a>
<a href="#" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
</a>
<a href="#" className={`${color?.textgray} hover:${color?.text} cursor-pointer p-1 ${color?.hover} rounded inline-flex justify-center`}>
<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
</a>
</div>
</div>
<div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
{/* <button type="button" data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
<svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
Add user
</button>
<a href="#" className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
<svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
Export
</a> */}
</div>
</div>
</div>
        <div className="flex flex-col mt-8">
               
      <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
     <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="serviceTable">
      <thead className={` ${color?.tableheader} `}>
        <tr className="p-4 text-left text-s font-bold text-gray-700 uppercase">
          <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>Service Name</th>
          {/* Service Description */}
         
          <th scope="col"  className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>Service Description</th>
          <th scope="col" className={`p-4 text-left text-xs font-semibold ${color?.textgray} uppercase`}>Service Value</th>
      </tr>
      </thead> 
      <tbody className={` ${color?.whitebackground} divide-y  divide-gray-200`} id="TableList" >
        {services?.map((item,idx)=>{  
     return(<>
   
  <tr key={idx} className={`${color?.hover}`}>
           <td className=
           {`overflow-x-scroll p-4 whitespace-nowrap capitalize text-base font-normal ${color?.text}`}
           >{item?.service_name?.replaceAll("_"," ")}
           <p className={`whitespace-nowrap text-xs ${color?.text}`}>
            {item.service_description.slice(0,71)}<br/>
            {item.service_description.slice(71,140)}<br/>
            {item.service_description.slice(140,210)}<br/>
            {item.service_description.slice(210,280)}
            </p>
           </td>
          
           
           <td><input type='text' 
            className= {`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}
                                                                   
                  
            onChange={(e) => {
              setFinalServices(finalServices?.map((i) => {
                if (i?.service_id === item?.service_id) {
                  i.service_comment = e.target.value
                }
                return i
              }))
            }} /></td>
            <td>
           {(() => {
      switch (item?.service_id) {
          case 'ser0016': return (<div>
              {/*Kitchen Availability*/}
              <select 
              onChange={(e) => {
                setFinalServices(finalServices?.map((i) => {
                  if (i?.service_id === item?.service_id) {
                    i.service_value = e.target.value
                  }
                  return i
                }))
              }}
              className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}>
                  <option select>Select</option>
                  <option value="Available in all rooms">Available in all rooms</option>
                  <option value="Available in some rooms">Available in some rooms</option>
                  <option value="Not available">Not available</option>
              </select>
          </div>)
          case 'ser0017': return (<div>
              {/*Parking Type*/}
              <select
              onChange={(e) => {
                setFinalServices(finalServices?.map((i) => {
                  if (i?.service_id === item?.service_id) {
                    i.service_value = e.target.value
                  }
                  return i
                }))
              }}
              className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}>
                  <option select>Select</option>
                  <option value="No payment required">No Payment Required</option>
                  <option value="Paid">Paid</option>
                  <option value="Not available">Not available</option>
              </select>
          </div>)
          case 'ser0020': return (<div>
              {/*Swimming Pool*/}
              <select 
              onChange={(e) => {
                setFinalServices(finalServices?.map((i) => {
                  if (i?.service_id === item?.service_id) {
                    i.service_value = e.target.value
                  }
                  return i
                }))
              }} 
              className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}
                                                                   
              >
                  <option select>Select</option>
                  <option value="Indoors">Indoors</option>
                  <option value="Outdoors">Outdoors</option>
                  <option value="Indoors and outdoors">Indoors and Outdoors</option>
                  <option value="Not available">Not available</option>
              </select>
          </div>)
          case 'ser0022': return (<div>
              {/*Wifi Type*/}
              <select
              onChange={(e) => {
                setFinalServices(finalServices?.map((i) => {
                  if (i?.service_id === item?.service_id) {
                    i.service_value = e.target.value
                  }
                  return i
                }))
              }}
              className={`shadow-sm  ${color?.whitebackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}
                                                                   >
                  <option select>Select</option>
                  <option value="No payment required">No Payment Required</option>
                  <option value="Paid">Paid</option>
                  <option value="Not available">Not available</option>
                  <option value="Not available">Not available</option>
              </select>
          </div>)
          default: return ( <div className="form-check mx-2  form-check-inline">

          <label htmlFor={`default-toggle${idx}`} className="inline-flex relative ml-4 items-center cursor-pointer">
              <input type="checkbox" value={true} 
                  onChange={(e) => {
                    setFinalServices(finalServices?.map((i) => {
                      if (i?.service_id === item?.service_id) {
                        i.service_value = e.target.value==="true"?"yes":"no"
                      }
                      return i
                    }))
                  }}
                  id={`default-toggle${idx}`} className="sr-only peer" />
              <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 
                     dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
                     peer-checked:after:translate-x-full 
                     peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                     after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                      after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                       </label>
                    </div>)
                    }
                   })()}
          
             </td>
             
          </tr>
          
        </>)
         
        })}
      </tbody>
     </table></div></div>
     </div>
    
      <div className="items-center p-6 border-t border-gray-200 rounded-b">
        <button
          className="text-white float-right mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
           
          onClick={(e) => JSON.stringify(currentProperty?.property_id).toUpperCase() != 'NULL' ? submitServices(e) : 
          toast.error("APP: Property not registered", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })}
          type="button"
        >
          {language?.submit}
        </button>
      
     
      </div>
    </>

:









                    <Table gen={gen} setGen={setGen} color={color}
                        edit={updateServices} common={language?.common} cols={language?.ServicesCols}
                        name="Services" /> 
                        }
                        </div>
                {/* Toast Container */}
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />

            </div>
        </>
    )
}

export default Services
Services.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

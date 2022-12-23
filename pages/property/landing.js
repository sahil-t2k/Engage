import React from "react";
import UserProfileSidebar from "../../components/userprofilesidebar";
import UserProfileHeader from "../../components/userprofileheader";
import { useEffect, useState } from "react";
import Title from '../../components/title';
import axios from "axios";
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
const  Landing=() =>{ 
  var locale;
  
  /** Router for Redirection **/
  const router = useRouter();

  /** State Intialisation for storing all Properties of Current User **/
 const [ownerdata, setOwnerdata] = useState([]);
 const [visible, setVisible] = useState(0);
 const [darkModeSwitcher, setDarkModeSwitcher] = useState()
 const [color, setColor] = useState({})
 const[modeChanger,setModeChanger] = useState("")
 
  useEffect(()=>{
    firstfun();
    if(JSON.stringify(currentUser)==='null'){
      router.push(window.location.origin)
    }    
    else{
      fetchProperty();
    }
   
  },[])

 
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

    
  useEffect(()=>{ 
    setColor(DarkModeLogic(darkModeSwitcher))
   },[darkModeSwitcher])


  /** Use Effect to fetch all the properties of Current user **/
  const fetchProperty = async () => { 
    try {
      if (typeof window !== 'undefined') {
      const l = localStorage.getItem("Language");
      }
      console.log("language "+l)
      const url = `/api/${l}/properties/${currentUser.id}`;
      logger.info("url" +url)
      const response = await axios.get(url, {
        headers: { accept: "application/json" },
      });
      setOwnerdata(response.data);
      setVisible(1)
    } catch (error) {
      if (error.response) {
        logger.error("Current User Properties Error");
      } else {
        logger.error("Current User Properties Error");
      }
    }
  };

  /**Function to save Current property to be viewed to Local Storage**/
  const LocalProperty = ({ item }) => {  
    localStorage.setItem("property", JSON.stringify(item));
    router.push('./propertysummary');
  };

  return ( 
    <>
     <Title name={`Engage |  ${language?.landing}`}/>
     <UserProfileHeader color={color}/>
     <UserProfileSidebar  color={color} Primary={darkModeSwitcher} Sec={setDarkModeSwitcher}/>
 
     <div className={`min-h-screen ${color?.greybackground} p-4 `}>
     <div id="main-content"
            className={`px-4 pt-24 py-2 relative overflow-y-auto lg:pl-96`}>
        <div className={`${color?.whitebackground} shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0`} >
        <div className="p-4 sm:py-8 sm:px-2 lg:p-space-y-2">
          <div className="text-center mt-16">
             <div className={visible === 0 ? ' block w-32 h-8 my-2 flex justify-center' : 'hidden'}><></></div>
          <div className={visible === 1? ' block' : 'hidden'}>
            <p className="capitalize font-semibold text-3xl font-sans sm:mt-4 mx-10 mt-2 mb-6 text-cyan-500">
           {language?.welcome} {currentUser?.name}
            </p></div>
          </div>
          <div className={visible === 0 ? ' block w-36 h-8 my-2 flex justify-center' : 'hidden'}><Buttonloader /></div>
          <div className={visible === 1? ' block' : 'hidden'}>
          <p className={ `${color.text} font-semibold mb-2 text-lg `}>{language?.List} {language?.ofproperties}</p>
          </div>
          <form className=" space-y-1" action="#">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden">
                  <div className={visible === 0 ? 'block' : 'hidden'}><Landingloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                    <table className="table-fixed min-w-full divide-y divide-gray-200">
                      <thead className={`${color.greybackground}` }>
                        <tr>
                          <th
                            scope="col"
                            className={`${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                            }> {language?.property} {language?.name}</th>
                          <th
                            scope="col"
                            className={`${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                           }
                          >
                            {language?.property} {language?.category}
                          </th>
                          <th
                            scope="col"
                            className={`${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                            }
                          >
                            {language?.Status}
                          </th>
                          <th
                            scope="col"
                            className={ `${color.text} px-1 py-4 text-left text-sm font-semibold  uppercase `
                            }
                          >
                            {language?.action}
                          </th>
                        </tr>
                      </thead>
                      <tbody  className={ `${color.text} divide-y divide-gray-200`
                            }>
                        {Object.keys(ownerdata).length!=0?ownerdata?.map((item, idx) => {
                          return (
                            <tr className={`${color?.hover}`} key={idx}>
                              <td 
                              className={ `${color.text} p-1 whitespace-nowrap text-base font-medium  capitalize`}
                              >
                                {item?.property_name}
                              </td>
                              <td className={ `${color.text} p-1 whitespace-nowrap text-base font-medium  capitalize`}>
                                {item?.property_category}
                              </td>
                              <td className={ `${color.text} p-1 whitespace-nowrap text-base font-medium  capitalize`}>
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                  {language?.active}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap space-x-1">
                               <Button Primary={language?.View}  onClick={() => {LocalProperty({ item});}} />
                              </td>
                            </tr>
                          );
                        }):<></>}
                      </tbody>
                    </table>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
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
 
  </>
  );
}
export default Landing;
Landing.getLayout = function PageLayout(page){
  return(
    <>
    {page}
    </>
  )
  }

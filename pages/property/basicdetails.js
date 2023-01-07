import React, { useState, useEffect } from 'react';
import Title from '../../components/title';
import objChecker from "lodash";
import Lineloader from '../../components/loaders/lineloader';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/router";
import english from "../../components/Languages/en";
import french from "../../components/Languages/fr"
import arabic from "../../components/Languages/ar"
import Button from "../../components/Button";
import Footer from '../../components/Footer';
import colorFile from '../../components/color';
import Headloader from '../../components/loaders/headloader';
import Textboxloader from '../../components/loaders/textboxloader';
import validatebasicDetails from '../../components/validation/basicdetails';
var language;
var currentProperty;
var currentLogged;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const logger = require("../../services/logger");
let colorToggle;

export default function BasicDetails() {
  const router = useRouter();
  const [visible, setVisible] = useState(0);
  const [spinner, setSpinner] = useState(0)
  const [basicDetails, setBasicDetails] = useState([]);
  const [flag, setFlag] = useState([]);
  const [color, setColor] = useState({})
  const [error, setError] = useState({})
  const[mode,setMode] = useState()
  const [imageLogo, setImageLogo] = useState()
  const [uploadImageSpin, setUploadImageSpin] = useState(false)


  /** Fetching language from the local storage **/
  useEffect(() => {
    firstfun();
  }, [])
  
  const firstfun = () => {
    if (typeof window !== 'undefined') {
      var locale = localStorage.getItem("Language");
      colorToggle = localStorage.getItem("colorToggle");
      if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
        window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) : setColor(colorFile?.light)
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
      /** Current Property Details fetched from the local storage **/
      currentProperty = JSON.parse(localStorage.getItem("property"));
      currentLogged = JSON.parse(localStorage.getItem("Signin Details"));

    }
  }

  const fetchBasicDetails = async () => {
    const url = `/api/${currentProperty.address_province.replace(
      /\s+/g,
      "-"
    )}/${currentProperty.address_city}/${currentProperty.property_category
      }s/${currentProperty.property_id}`;
    axios.get(url)
      .then((response) => {
        setBasicDetails(response?.data);
        setAllHotelDetails(response?.data);
        logger.info("url  to fetch property details hitted successfully")
        setVisible(1)
      })
      .catch((error) => { logger.error("url to fetch property details, failed") });
  }
  /* Function call to fetch Current Property Details when page loads */
  useEffect(() => {
    if (JSON.stringify(currentLogged) === 'null') {
      router?.push(window.location.origin)
    }
    else {
      fetchBasicDetails();
    }

  }, []);

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
   router.push('./basicdetails')
  }

  const current = new Date();
  let month = current.getMonth() + 1;
  const descriptionDate = `${current.getDate()}/${month < +10 ? `0${month}` : `${month + 1}`}/${current.getFullYear()}`;
  const [allHotelDetails, setAllHotelDetails] = useState([])

  /* Edit Basic Details Function */
  const submitBasicEdit = () => {
    if (flag === 1) {
      if (objChecker.isEqual(allHotelDetails, basicDetails)) {
        toast.warn('APP: No change in Basic Details detected. ', {
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
          "property_id": currentProperty?.property_id,
          "property_name": allHotelDetails.property_name?.toLowerCase(),
          "property_category": allHotelDetails.property_category?.toLowerCase(),
          "property_brand": allHotelDetails.property_brand,
          "established_year": allHotelDetails.established_year,
          "star_rating": allHotelDetails.star_rating,
          "description_title": allHotelDetails.description_title,
          "description_body": allHotelDetails.description_body,
          "description_date": allHotelDetails.description_date
        }
       const url = '/api/basic'
        axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
          ((response) => {
            setSpinner(0);
            toast.success("API: Basic Details Updated Successfully!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            fetchBasicDetails();
            router.push("./basicdetails");
            setAllHotelDetails([])
            setFlag([]);
          })
          .catch((error) => {
            setSpinner(0)
            toast.error("API: Basic Details Update Error!", {
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
      toast.warn('APP: No change in Basic Details detected. ', {
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
  const validationBasicDetails = () => {
    setError({})
    var result = validatebasicDetails(allHotelDetails)
    if (result === true) {

      submitBasicEdit();
    }
    else {
      setError(result)
    }
  }

   /* Function to upload logo to cloud*/
   const uploadImage = (image) => {
    setUploadImageSpin(true)
   const imageDetails = image
    const formData = new FormData();
    formData.append("file", imageDetails);
    formData.append("upload_preset", "Travel2Kashmir")
    formData.append("enctype", "multipart/form-data")
    axios.post("https://api.cloudinary.com/v1_1/dvczoayyw/image/upload", formData)
        .then(response => {
            setImageLogo(response?.data?.secure_url)
            submitPhotoEdit(response?.data?.secure_url)
        })
        .catch(error => {
          toast.error("Image upload error. ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
           

        });

}
// Logo Upload
const submitPhotoEdit = (logo) => {
      const final_data = {
        "property_id": currentProperty?.property_id,
        "logo_link": logo
       
      }
     const url = '/api/basic'
      axios.put(url, final_data, { header: { "content-type": "application/json" } }).then
        ((response) => {
          
          toast.success("API: Logo update success.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchBasicDetails();
          router.push("./basicdetails");
          setUploadImageSpin(false);
          
        })
        .catch((error) => {
          
          toast.error("API:Logo Update error.", {
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
      <Title name={`Engage |  ${language?.basicdetails}`} />
    

        <Header color={color} Primary={english.Side} Type={currentLogged?.user_type} Sec={colorToggler} mode={mode} setMode={setMode}/>
        <Sidebar color={color} Primary={english.Side} Type={currentLogged?.user_type} />

        <div id="main-content"
          className={`${color?.greybackground} px-4 pt-24 pb-2 relative overflow-y-auto lg:ml-64`}>
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
                  <div className={`${color?.text} text-base font-medium  inline-flex items-center`}>
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <div className={visible === 0 ? 'block w-16' : 'hidden'}><Headloader /></div>
                    <div className={visible === 1 ? 'block' : 'hidden'}>   <Link href="./propertysummary" className="text-gray-700 text-sm   font-medium hover:{`${color?.text} ml-1 md:ml-2">
                      <a>{basicDetails?.property_name}</a>
                    </Link>
                    </div></div>

                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <div className={`${color?.textgray} text-base font-medium  inline-flex items-center`}>
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <span className="text-gray-400 ml-1 md:ml-2 font-medium text-sm  " aria-current="page">{language?.basicdetails}</span>
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          {/* Basic Details Form */}
          <div className={`${color?.whitebackground} shadow rounded-lg px-12  sm:p-6 xl:p-8  2xl:col-span-2`}>
            <h6 className={`${color?.text} text-xl flex leading-none pl-6 lg:pt-2 pt-6  font-bold`}>
              {language?.basicdetails} 
            </h6>
            <div className="pt-6">
              <div className=" md:px-4 mx-auto w-full">
                <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <div className= "relative"
                        htmlFor="grid-password">
                        <img className="rounded-full w-24 h-24 block" src={allHotelDetails?.logo} alt=""/>
                     
                        <input type="file" id="actual-btn"
                         onChange={e => {
                          uploadImage(e.target.files[0]);
                      }}
                        className='hidden' name="myImage" accept="image/png, image/gif, image/jpeg, image/jpg"/>
                       <label htmlFor="actual-btn" className="absolute bottom-0.5 left-16 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-full text-sm inline-flex items-center px-2 py-2 text-center">
                       <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>
                       </label>
    {uploadImageSpin === true ?
     <svg className="absolute w-8 h-8 bottom-6 left-6 right-6  text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>:<></>}
                       </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4"></div>
                  <div className="w-full lg:w-6/12  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.propertyname}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_name"
                          className={`shadow-sm ${color?.greybackground} border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={basicDetails?.property_name} required
                          onChange={
                            (e) => (
                              setAllHotelDetails({ ...allHotelDetails, property_name: e.target.value }, setFlag(1))
                            )
                          } />
                        <p data-testid='label' title={error?.property_name} className="text-sm text-sm text-red-700 font-light">
                          {error?.property_name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password">
                        {language?.propertycategory}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <select data-testid="test_property_category" className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setAllHotelDetails({ ...allHotelDetails, property_category: e.target.value }, setFlag(1))
                            )
                          } required
                        >
                          <option defaultValue={basicDetails?.property_category} disabled>{basicDetails?.property_category}</option>
                          <option value="hotel" >Hotel</option>
                          <option value="resort">Resort</option>
                          <option value="motel">Motel</option>
                        </select>
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.property_brand}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.propertybrand}
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="text" data-testid="test_property_brand"
                          className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={basicDetails?.property_brand}
                          onChange={
                            (e) => (
                              setAllHotelDetails({ ...allHotelDetails, property_brand: e.target.value }, setFlag(1))
                            )
                          }
                        />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.property_brand}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.establisheddate}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input
                          type="Date" data-testid="test_established_year"
                          className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={basicDetails?.established_year} required
                          max={descriptionDate}
                          onChange={
                            (e) => (
                              setAllHotelDetails({ ...allHotelDetails, established_year: e.target.value }, setFlag(1))
                            )
                          }
                        />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.established_year}</p></div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.starrating}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <select data-testid="test_star_rating" className={`shadow-sm ${color?.greybackground} capitalize border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          required onChange={
                            (e) => (
                              setAllHotelDetails({ ...allHotelDetails, star_rating: parseInt(e.target.value) }, setFlag(1))
                            )
                          }
                        >
                          <option defaultValue={basicDetails?.star_rating} disabled >{basicDetails?.star_rating}</option>
                          <option value="1" >1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.star_rating}</p></div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.descriptiontitle}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input data-testid="test_description_title"
                          type="text"
                          className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          required defaultValue={basicDetails?.description_title}
                          onChange={
                            (e) => (
                              setAllHotelDetails({ ...allHotelDetails, description_title: e.target.value }, setFlag(1))
                            )
                          }
                        />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.description_title}</p></div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.description}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className={visible === 0 ? 'block w-auto' : 'hidden'}><Textboxloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <textarea rows="5" columns="50" data-testid="test_description_body"
                          className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          onChange={
                            (e) => (
                              setAllHotelDetails({ ...allHotelDetails, description_body: e.target.value }, setFlag(1))
                            )
                          }
                          defaultValue={basicDetails?.description_body}
                          required
                        />
                        <p className="text-sm text-sm text-red-700 font-light">
                          {error?.description_body}</p></div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={`text-sm font-medium ${color?.text} block mb-2`}
                        htmlFor="grid-password"
                      >
                        {language?.descriptiondate}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>

                      <div className={visible === 0 ? 'block' : 'hidden'}><Lineloader /></div>
                      <div className={visible === 1 ? 'block' : 'hidden'}>
                        <input type="text" readOnly data-testid="test_description_date" required
                          className={`shadow-sm ${color?.greybackground}  border border-gray-300 ${color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`}
                          defaultValue={descriptionDate}
                        /></div>
                    </div>
                  </div>

                  <div className="flex mr-2 items-center justify-end space-x-2 sm:space-x-3 ml-auto">
                    <div className={flag !== 1 && spinner === 0 ? 'block' : 'hidden'}>
                      <Button testid="test_button_disabled" Primary={language?.UpdateDisabled} /></div>
                    <div className={spinner === 0 && flag === 1 ? 'block' : 'hidden'}>
                      <Button testid="test_button" Primary={language?.Update} onClick={validationBasicDetails} />
                    </div>
                    <div className={spinner === 1 && flag === 1 ? 'block' : 'hidden'}>
                      <Button testid="test_button_spinner" Primary={language?.SpinnerUpdate} />
                    </div>
                  </div>


                </div>
              </div>
            </div>
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
        <Footer color={color} Primary={english.Foot} />
     

    </>
  )
}

BasicDetails.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}

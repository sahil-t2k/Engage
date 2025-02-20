import { useState, useRef, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import english from '../../components/Languages/en';
import icon from '../../components/GlobalData';
import { logger, reqSerializer} from '../../utills/logger'
import french from '../../components/Languages/fr';
import axios from 'axios'
import Marquee from "react-easy-marquee";
import arabic from '../../components/Languages/ar'
import Carousel from 'better-react-carousel';
import Headloader from './Loaders/headloader';
import SubHeading from './Loaders/subheading';
import GallerySlider from './Loaders/galleryslider';
import ImageLoader from '../../components/loaders/imageloader';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import SwiperCore,{ Autoplay, Pagination, Navigation } from "swiper";
import Router, { useRouter } from "next/router";
import LineLoader from '../../components/loaders/lineloader';
var currentUser;
var currentProperty;
var currentLogged;
var checkInDate;
var checkOutDate;
var i = 0;
var defaultRate = {
   base_rate_amount: '1071',
   tax_rate_amount: '175',
   other_charges_amount: '0',
   base_rate_currency: 'USD'
}

function ClassicDark(args) {
   SwiperCore.use([Navigation, Pagination, Autoplay]);
   const [phone, setPhone] = useState({});
   const [ip, setIP] = useState({});
   const [language, setLanguage] = useState(english);
   const [calendarIn, setCalendarIn] = useState(false);
   const [children, setChildren] = useState(false);
   const [guests, setGuests] = useState(false);
   const [date, setDate] = useState();
   const [calendarOut, setCalendarOut] = useState(false);
   const [visible, setVisible] = useState(0);
   const [email, setEmail] = useState({});
   const [allRooms, setAllRooms] = useState({});
   const [allPackages, setAllPackages] = useState({});
   const [rate, setRate] = useState(defaultRate);
   const [amenity, setAmenity] = useState(false);
   const[checkinDate,setCheckinDate] = useState();
   const[checkoutDate,setCheckoutDate] = useState();
   const [packages, setPackages] = useState(false);
   const [open, setOpen] = useState({
      "view": false,
      "id": ''
   });
   const [singleRoom, setSingleRoom] = useState(false);
   const [d1, setD1] = useState();
   const [d2, setD2] = useState();
   const [guest, setGuest] = useState(4);
   const [child, setChild] = useState(2);
   const [smSidebar, setSmSidebar] = useState(false)
   const [allHotelDetails, setAllHotelDetails] = useState([]);

  /** Router for Redirection **/
  const router = useRouter();
  useEffect(() => {
     const firstfun = () => {
        if (typeof window !== 'undefined') {
          setLanguage(args?.language)
        }
     }
     firstfun();
     const current = new Date();
     let month = current.getMonth() + 1;
   
     checkInDate = `${current.getFullYear()}-${month < +10 ? `0${month}` : `${month }`}-${current.getDate()}`;
     checkOutDate = `${current.getFullYear()}-${month < +10 ? `0${month}` : `${month}`}-${current.getDate() + 1}`;
     setD1(new Date(`${current.getFullYear()}-${month < +10 ? `0${month}` : `${month}`}-${current.getDate()}`).toString().slice(4, 10));
     setD2(new Date(`${current.getFullYear()}-${month < +10 ? `0${month}` : `${month}`}-${current.getDate() + 1}`).toString().slice(4, 10));
     setCheckinDate(checkInDate);
     setCheckoutDate(checkOutDate);
    setVisible(1);
  }, [])

  /* Function call to fetch Current Property Details when page loads */
  useEffect(() => {
     fetchHotelDetails();
  }, []);
  
  useEffect(() => {
   getData();
 }, [])

 const getData = async () => {
   const res = await axios.get('https://geolocation-db.com/json/');
   setIP(res.data.IPv4)
 }

 //read from cookies
 function getIPData(msg,url) {
    const info = {req: {method: 'GET', url:`${location.pathname.toLowerCase()}${url.toLowerCase()}`, headers: { "content-type": "application/json" }, "remoteAddress": ip,
    "pathName": location.pathname, "port": location.port}}
   logger.info(info,msg);  
 }

//  For Rooms Logger
 function getMsgSection(state,section) {
   if(state=== false){getIPData(`${section} section expanded`,`/${section}`)}
   if(state=== true){getIPData(`${section}  section contract`,`/${section}`)}
 }
 
//   For Single Room Logger
function  getSingleSection(state,name,section){
 if(state=== false){getIPData(`${name} ${section} expanded`,`/${section}/${name.trim().replace(" ","-")}`)}
 if(state=== true){getIPData(`${name} ${section} contract`,`/${section}/${name.trim().replace(" ","-")}`)}
}

  const fetchHotelDetails = async () => {
           setAllHotelDetails(args?.allHotelDetails);
           setVisible(1)
  }

   const changeLanguage = ((props) => {
   if(props === "en"){
      setLanguage(english)
   }
   if(props === "fr"){
      setLanguage(french)
   }
   if(props === "ar"){
      setLanguage(arabic)
   }
   })
   // Function for Check In
   const changeCheckIn =  (d1) => {
      setCheckinDate(d1);
      setD1(new Date(d1).toString().slice(4,10));
    }
    // Function for Check Out
    const changeCheckOut =  (d2) => {
      setCheckoutDate(d2)
     setD2(new Date(d2).toString().slice(4,10));
   }
   return ( 
     <>
     <div className='bg-gray-900 '>
         <div className="header-dark w-full">
            <div className="container">
               <div className="header-logo">
                  <span className="material-icons-outlined header-logo-icon">
                     mode_of_travel</span> <span className='text-sky-600'>{args?.allHotelDetails?.property_name} </span>
               </div>
               <div className="menu-toggle">
                  <button onClick={() => setSmSidebar(!smSidebar)} > <span className="material-icons-outlined"> menu </span></button>
               </div>

               <ul className="header-menu">
                  <select onChange={
                            (e) => (
                             changeLanguage(e.target.value)
                            )
                          }
                   className="shadow-sm bg-gray-900 border border-gray-300 text-white sm:text-sm rounded-md  block w-32 py-1 px-2">
                     <option value="en">English</option>
                     <option value="fr">French</option>
                     <option value="ar">Arabic</option>
                  </select>
                  <a 
                     href="#home" onClick={() => { getIPData("Anchor tag Home from header","/home") }}
                     className="header-menu-item"
                  ><span className='text-white hover:text-gray-400'>{language?.home} </span>
                  </a>
                  <a  onClick={() => { getIPData("Anchor tag About from header","/about" )}}
                     href="#about"
                     className="header-menu-item"
                  >
                     <span className='text-white hover:text-gray-400'>{language?.about}</span></a>
                  <a onClick={() => { getIPData("Anchor tag Gallery from header","/gallery" )}}
                     href="#gallery"
                     className="header-menu-item"
                  ><span className='text-white hover:text-gray-400'>{language?.gallery}</span></a>
                  <a
                     href="#rooms" onClick={() => { getIPData("Anchor tag Rooms from header","/rooms") }}
                     className="header-menu-item"
                  ><span className='text-white hover:text-gray-400'>{language?.rooms}</span></a>
                  <a
                     href="#amenities" onClick={() => { getIPData("Anchor tag Amenities from header","/amenities") }}
                     className="header-menu-item"
                  ><span className='text-white hover:text-gray-400'>{language?.amenities}</span></a
                  >
                  <a
                     href="#packages" onClick={() => { getIPData("Anchor tag Packages from header","/packages") }}
                     className="header-menu-item"
                  ><span className='text-white hover:text-gray-400'>{language?.packages}</span></a
                  >
                  <a onClick={() => { getIPData("Anchor tag Contact us from header","/contactus") }}
                     href="#contactus"
                     className="header-menu-item"
                  ><span className='text-white hover:text-gray-400'>{language?.contactus}</span></a
                  >
                  <div className="header-menu-copyright"><span className='text-white hover:text-gray-200'>Made with Tailwind CSS</span></div>
               </ul>

            </div>

            <div className={smSidebar === true ? "block" : "hidden"}>
               <aside id="sidebar" className="fixed  lg:hidden z-20 h-full top-14 right-0 h-min flex  flex-shrink-0 flex-col w-full transition-width duration-75" aria-label="Sidebar">
                  <div className="relative  flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-900 pt-0">
                     <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 bg-gray-900 divide-y space-y-1">
                           <ul className="space-y-2 pb-2">

                              <li className="text-base text-white font-normal rounded-lg flex items-center p-2">
                                 <span className="ml-3 flex-1 whitespace-nowrap">
                                    <a
                                       href="#home"
                                    > <button onClick={() => { setSmSidebar(!smSidebar);getIPData("Anchor tag Home","/home" ) }}>{language?.home}</button></a></span>
                              </li>
                              <hr />
                              <li className="text-base text-white font-normal rounded-lg flex items-center p-2">
                                 <span className="ml-3 flex-1 whitespace-nowrap">
                                    <a
                                       href="#about"> <button onClick={() => { setSmSidebar(!smSidebar);getIPData("Anchor tag About from header","/about") }}>{language?.about}</button>
                                    </a> </span>
                              </li>
                              <hr />
                              <li className="text-base text-white font-normal rounded-lg flex items-center p-2">
                                 <span className="ml-3 flex-1 whitespace-nowrap">
                                    <a
                                       href="#gallery">
                                       <button onClick={() => { setSmSidebar(!smSidebar);getIPData("Anchor tag Gallery from header","/gallery")  }}>{language?.gallery}</button></a>
                                 </span>
                              </li>
                              <hr />
                              <li className="text-base text-white font-normal rounded-lg flex items-center p-2">
                                 <span className="ml-3 flex-1 whitespace-nowrap">
                                    <a
                                       href="#rooms"><button onClick={() => { setSmSidebar(!smSidebar); getIPData("Anchor tag Rooms from header","/rooms") }}>{language?.rooms}</button></a>
                                 </span>
                              </li>
                              <hr />
                              <li className="text-base text-white font-normal rounded-lg flex items-center p-2">
                                 <span className="ml-3 flex-1 whitespace-nowrap">
                                    <a href="#amenities"><button onClick={() => { setSmSidebar(!smSidebar);getIPData("Anchor tag Amenities from header","/amenities")  }}>{language?.amenities}</button></a>
                                 </span>
                              </li>
                              <hr />
                              <li className="text-base text-white font-normal rounded-lg flex items-center p-2">
                                 <span className="ml-3 flex-1 whitespace-nowrap">
                                    <a
                                       href="#packages"><button onClick={() => { setSmSidebar(!smSidebar);getIPData("Anchor tag Packages from header","/packages") }}>{language?.packages}</button></a>
                                 </span>
                              </li>
                              <hr />
                              <li  className="text-base text-white font-normal rounded-lg flex items-center p-2">
                                 <span className="ml-3 flex-1 whitespace-nowrap">
                                    <a
                                       href="#contactus"><button onClick={() => { setSmSidebar(!smSidebar);getIPData("Anchor tag Contact us from header","/contactus") }}
                                          >{language?.contactus} </button></a>
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </aside>
            </div>
         </div>
         <div className='bg-gray-800 -mt-12 px-10 pb-10'>
         <div className="tour container ">
            <div className="tour-head">
               <div id="home" className="tour-head-left">
                  <div className="tour-title">
                     <div className={visible === 0 ? 'block w-32 my-2' : 'hidden'}><Headloader /></div>
                     <div className={visible === 1 ? 'block text-white mt-8' : 'hidden'}>
                        {args?.allHotelDetails?.description_title}</div>
                  </div>
                  <div className={visible === 0 ? 'block w-64' : 'hidden'}><SubHeading /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>
                     <div className="tour-overview">
                        <div className="tour-overview-item flex">

                           {args?.allHotelDetails?.property_category} {language?.in}  <p className='text-white pl-1'>{args?.allHotelDetails?.address?.[i]?.address_city}</p>
                        </div>
                        <div className="tour-overview-item flex">
                           <p className='text-white pr-1'>{args?.allHotelDetails?.star_rating} {language?.star}</p>
                            {language?.accomodation}</div>
                        <div className="tour-overview-item ">
                        <span className='-mt-0.5 mr-1'> 
                        <StarRatings
                  rating={4.5}
                  starRatedColor="#FDCC0D"
                  starDimension='15px'
                     numberOfStars={5}
                     starSpacing='1px'
                      name='rating'
                       /></span> 
                          <p className='text-white'> ({args?.allHotelDetails?.Reviews?.length}) </p>
                        </div>
                     </div></div>
               </div>
            </div>
            </div>
            {/* Body */}        
            <div className="tour-wrapper">
               <div className="tour-content">
                  {/* Slider */}
                  <div className={visible === 0 ? 'block w-32 mb-2' : 'hidden'}><ImageLoader /></div>
                  <div className={visible === 1 ? 'block' : 'hidden'}>
                     <div className="tour-hero">
                           <Swiper
                              centeredSlides={true}
                              autoplay={{
                                 delay: 1000,
                                 disableOnInteraction: false,
                              }}

                              modules={[Autoplay, Pagination, Navigation]}
                              className="mySwiper">
                           {args?.allHotelDetails?.images?.map((resource, index) => {
                              return (<SwiperSlide key={index}>
                                 <img
                                    className="object-fill w-full h-96"
                                    src={resource?.image_link}
                                    alt="image slide 1"
                                 />

                              </SwiperSlide>
                              )

                           })}
                        </Swiper>
                     </div>

                     <div className="tour-content-block">
                        <div className="tour-description">
                         <p className='text-gray-400'> {args?.allHotelDetails?.description_body}</p> 
                        </div>
                     </div></div>

                  {/* Gallery */}
                  <div id="gallery" className="tour-content-block">
                     <div className="tour-content-title"><span className='text-white'>{language?.gallery}</span></div>
                     <div className="relative overflow-hidden">
                        <div className={visible === 0 ? 'block  mb-2' : 'hidden'}><GallerySlider /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                        <Carousel cols={2} rows={1} gap={10} autoPlay={1000} loop={true} 
                             responsiveLayout={ [
                              {
                                breakpoint: 480,
                                cols: 1,
                                rows: 1,
                                gap: 10,
                                loop: true,
                                autoplay: 1000
                              },
                              {
                                 breakpoint: 810,
                                 cols: 2,
                                 rows: 1,
                                 gap: 10,
                                 loop: true,
                                 autoplay: 1000
                               },
                               {
                                 breakpoint: 1200,
                                 cols: 2,
                                 rows: 1,
                                 gap: 10,
                                 loop: true,
                                 autoplay: 1000
                               },
                            ]}
                            >
                              {args?.allHotelDetails?.images?.map((resource, index) => {
                                 return (
                                    <Carousel.Item key={index} >
                                       <img width="100%" style={{ height: "270px" }} className="rounded-lg" src={resource?.image_link} /></Carousel.Item>
                                 )
                              })}</Carousel></div>
                     </div>
                  </div>

                  {/* About */}
                  <div id="about" className="tour-content-block">
                     <div className="tour-content-title mb-8">
                     <p className='text-white'>{language?.about}</p></div>
                     <div className="tour-itinerary">

                        <div className="accordion">
                           {/* Rooms */}
                       <div id="rooms" className={singleRoom === false ? 'accordion-start accordion-panel' : 'accordion-start accordion-panel active'}>
                        <div className='accordion-trigger'  onClick={() => {setSingleRoom(!singleRoom);getMsgSection(singleRoom,"Rooms")}}>
                                 <button className='mb-6' >
                                    <div className='accordion-trigger'>
                                       <div className={visible === 0 ? 'block  w-32 mb-6' : 'hidden'}><SubHeading /></div>
                                       <div className={visible === 1 ? 'block' : 'hidden'}>
                                       <p className='text-white'>{language?.roomstochoose} ({args?.allRooms?.rooms?.length})</p></div>
                                    </div></button></div>
                              <div className={singleRoom === true ? 'block -mt-4 mb-4 ml-4 hover:cursor-pointer' : 'hidden'}>
                                 {args?.allRooms?.rooms?.map((resource, idx) => {
                                    return (
                                       <div className='group' key={idx}>
                                           <div  onClick={() => {
                                          setOpen({ ...open, view: !open.view, id: idx }); getSingleSection(open?.view,resource?.room_name,"Rooms")
                                         }}>
                                          <p className='flex capitalize mt-4 py-1'>
                                             <div className="my-1.5 mr-1.5 -ml-2 border-gray-200 border-0 rounded-full  font-bold text-gray-800  bg-gray-200 flex items-center justify-center" style={{ height: "22px", width: "22px", fontSize: "14px" }}>{idx + 1}</div>
                                             <button className='text-gray-600 font-semibold'
                                                ><p className='text-white'>{resource?.room_name}</p> </button>
                                             <button className='justify-end mr-1 ml-auto'>
                                                {open?.view === true && open?.id === idx ?
                                                   <span className=' font-semibold text-gray-400  '>
                                                      - </span>
                                                   :
                                                   <span className=' font-semibold text-gray-400 hidden group-hover:block'>
                                                      + </span>}</button>
                                          </p></div>
                                          <div className={open?.view === true && open?.id === idx ? 'block' : 'hidden'}>
                                             {/* Room Description */}
                                             <div className="tour-content-block">
                                                <div className="tour-description">
                                                  <p className='text-gray-400'> {resource?.room_description} </p>
                                                </div>
                                             </div>
                                             {/* Room Facilities */}
                                             <div className='tour-content-block1'>
                                                <div className='py-10'>
                                                   <div className="accordion-trigger">
                                                   <p className='text-white'>{language?.room} {language?.facilities}</p></div>

                                                   <div className="grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 mt-2 gap-3">
                                                      {resource?.room_facilities?.map((item, index) => {
                                                         return (
                                                            <span className='text-gray-400' key={index}>
                                                               <span>&#10004;
                                                                  {item?.service_name} </span></span>)
                                                      })}
                                                   </div>
                                                </div>
                                             </div>
                                             {/* Room Gallery */}
                                             <div className='tour-content-block1'>
                                                <div className='pb-8'>
                                                   <div className="accordion-trigger mb-4">
                                                   <p className='text-white'>{language?.room} {language?.gallery}</p></div>
                                                   <Carousel cols={2} rows={1} gap={10} autoPlay={1000} loop={true} 
                             responsiveLayout={ [
                              {
                                breakpoint: 480,
                                cols: 1,
                                rows: 1,
                                gap: 10,
                                loop: true,
                                autoplay: 1000
                              },
                              {
                                 breakpoint: 810,
                                 cols: 2,
                                 rows: 1,
                                 gap: 10,
                                 loop: true,
                                 autoplay: 1000
                               }
                            ]}
                            >
                                                      {resource?.room_images?.map((resource, index) => {
                                                         return (
                                                            <Carousel.Item key={index} >
                                                               <img width="100%" className="rounded" style={{ height: "160px", marginBottom: "10px" }} src={resource?.image_link} />
                                                               <span className='text-gray-400' >{resource?.image_title}</span>
                                                            </Carousel.Item>
                                                         )
                                                      })}</Carousel></div></div>

                                             {/* Book Now Button */}
                                             <div className='flex pb-8'>
                                                <div className='mr-2 ml-auto justify-end'>
                                                   <button  onClick={()=>{ setRate({
                                                         base_rate_amount: resource?.unconditional_rates?.[i]?.baserate_amount,
                                                         tax_rate_amount: resource?.unconditional_rates?.[i]?.tax_amount,
                                                         other_charges_amount: resource?.unconditional_rates?.[i]?.otherfees_amount,
                                                         base_rate_currency: resource?.unconditional_rates?.[i]?.baserate_currency
                                                      })}}
                                                   className='bg-green-600 sm:inline-flex text-white
            focus:ring-4 focus:ring-green-200 font-semibold text-white 
             rounded-lg text-sm px-4 py-2.5 text-center 
                ease-linear transition-all duration-150'>
                                                     {language?.booknow}
                                                   </button></div>
                                             </div></div>
                                       </div>)
                                 })}

                              </div>
                           </div>
                           {/* Amenity */}
                           <div id="amenities" className={amenity === false ? 'accordion-start accordion-panel' : 'accordion-start accordion-panel active'}>
                              <div className='accordion-trigger'  onClick={() => {setAmenity(!amenity);getMsgSection(amenity,"Amenities")}}>
                                 <button className="mb-6">
                                    <div className='accordion-trigger'>
                                       <div className={visible === 0 ? 'block w-32 mb-6' : 'hidden'}><SubHeading /></div>
                                       <div className={visible === 1 ? 'block' : 'hidden'}>
                                       <p className='text-white'>  {language?.property} {language?.amenities}</p></div>
                                    </div>
                                 </button></div>
                              <div className={amenity === true ? 'tour-content-block1 ' : 'hidden'}>
                                 <div className="grid ml-2 mb-8 grid-flow-row-dense lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3">
                                    {args?.services?.map((item, idx) => {
                                       return (
                                          <>
                                          {(() => {
                                             switch (item?.service_id) {
                                               case 'ser001': return (<div>
                                                 {/*AC*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.ac}
                                                   </span>
                                               </div>)
                                               case 'ser002': return (<div>
                                                  {/*All Inclusive Available*/}
                                                <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.inclusive}
                                                   </span>
                                               </div>)
                                               case 'ser003': return (<div>
                                                 {/*Child Friendly*/}
                                                 <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.childfriendly}
                                                   </span>   
                                               </div>)
                                               case 'ser004': return (<div>
                                                 {/*Golf Course*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.golf}
                                                   </span>
                                               </div>)
                                               case 'ser005': return (<div>
                                                 {/*Airport Shuttle*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.airport}
                                                   </span>
                                               </div>)
                                               case 'ser006': return (<div>
                                                 {/*Bar Lounge*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.bar}
                                                   </span>
                                               </div>)
                                               case 'ser007': return (<div>
                                                 {/*Beach*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.beach}
                                                   </span>
                                               </div>)
                                               case 'ser008': return (<div>
                                                 {/*Business Center*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.bussinesscenter}
                                                   </span>
                                               </div>)
                                               case 'ser009': return (<div>
                                                 {/*Fitness Center*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.fitnesscenter}
                                                   </span>
                                               </div>)
                                               case 'ser0010': return (<div>
                                                 {/*Free Breakfast*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.breakfast}
                                                   </span>
                                               </div>)
                                               case 'ser0011': return (<div>
                                                 {/*Hot Tub*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.hottub}
                                                   </span>
                                               </div>)
                                               case 'ser0012': return (<div>
                                                 {/*Laundary Service*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.laundary}
                                                   </span>
                                               </div>)
                                     
                                               case 'ser0013': return (<div>
                                                 {/*Restaurant*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.restaurant}
                                                   </span>
                                               </div>)
                                               case 'ser0014': return (<div>
                                                 {/*Room Service*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.roomservice}
                                                   </span>
                                               </div>)
                                               case 'ser0015': return (<div>
                                                 {/*Spa*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.spa}
                                                   </span>
                                               </div>)
                                               case 'ser0016': return (<div>
                                                 {/*Kitchen*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.kitchen}
                                                   </span>
                                               </div>)
                                               case 'ser0017': return (<div>
                                                 {/*Parking*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.parking}
                                                   </span>
                                               </div>)
                                     
                                               case 'ser0018': return (<div>
                                                 {/*Pets Allowed*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.pets}
                                                   </span>
                                               </div>)
                                               case 'ser0019': return (<div>
                                                 {/*Smoke Free*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.smokefree}
                                                   </span>
                                               </div>)
                                               case 'ser0020': return (<div>
                                                 {/*Swimming Pool*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.pool}
                                                   </span>
                                               </div>)
                                               case 'ser0021': return (<div>
                                                 {/*Wheel Chair*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.wheelchair}
                                                   </span>
                                               </div>)
                                               case 'ser0022': return (<div>
                                                 {/*Wifi Type*/}
                                                  <span  className="tooltip rounded-full hover:cursor-pointer hover:text-white text-gray-400 " title={item?.local_service_name}>
                                                   {icon?.Icons?.[i]?.wifi}
                                                   </span>
                                               </div>)
                                     
                                               default: return (<div></div>)
                                             }
                                           })()}
                                          </>
                                          )
                                    })}</div>
                              </div>
                           </div>

                           {/* Packages */}
                           {args?.allPackages?.packages  !== undefined?
                           <div id="packages" className={packages === false ? 'accordion-start accordion-panel' : 'accordion-start accordion-panel active'}>
                              <div className='accordion-trigger' onClick={() => { setPackages(!packages);getMsgSection(packages,"Packages")  }}>
                                 <button className="mb-6" >
                                    <div className='accordion-trigger' >
                                       <div className={visible === 0 ? 'block  mb-6 w-32' : 'hidden'}><SubHeading /></div>
                                       <div className={visible === 1 ? 'block' : 'hidden'}>
                                       <p className='text-white'> {language?.packages}</p>
                                       </div>
                                    </div>
                                 </button></div>
                              <div className={packages === true ? 'block -mt-4 mb-4 ml-4 hover:cursor-pointer' : 'hidden'}>
                                 {args?.allPackages?.packages?.map((resource, idx) => {
                                    return (
                                       <div className='group'key={idx}>
                                           <div onClick={() => {
                                          setOpen({ ...open, view: !open.view, id: idx }) ;getSingleSection(open?.view,resource?.package_name,"Packages")
                                         }}>
                                          <p className='flex capitalize mt-4 py-1 '>
                                             <div className="my-1.5 mr-1.5 -ml-2 border-gray-200 border-0 rounded-full  font-bold text-gray-800  bg-gray-200 flex items-center justify-center" style={{ height: "22px", width: "22px", fontSize: "14px" }}>{idx + 1}</div>
                                             <button className='text-gray-600 font-semibold'
                                               ><p className='text-white'>{resource?.package_name}</p> </button>

                                             <button className='justify-end mr-1 ml-auto'>
                                                {open?.view === true && open?.id === idx ?
                                                   <span className=' font-semibold text-gray-400  '>
                                                      - </span>
                                                   :
                                                   <span className=' font-semibold text-gray-400 hidden group-hover:block'>
                                                      + </span>}</button>
                                          </p></div>
                                          <div className={open?.view === true && open?.id === idx ? 'block' : 'hidden'}>
                                             {/* Package Description */}
                                             <div className="tour-content-block">
                                                <div className="tour-description">
                                                 <p className='text-gray-400'> {resource?.package_description}</p> 
                                                   {resource?.refundable === "true" ?
                                                      <p className='my-2 text-gray-400'> 
                                                      <span className='text-white font-semibold mr-1'>Refundable till</span> 
                                                       {resource?.refundable_until_days} days, {resource?.refundable_until_time}</p> :
                                                      <></>}
                                                </div>
                                             </div>

                                             {/* Package Services */}
                                             <div className='tour-content-block'>
                                                <div>
                                                   <div className="accordion-trigger">
                                                      <p className='text-white'>{language?.package} {language?.services}</p></div>

                                                   <div className="grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 mt-2 gap-3">
                                                      {resource?.package_services?.map((item, index) => {
                                                         return (
                                                            <>
                                                               {item?.value === true ? <><span className='capitalize text-gray-400' key={index}>
                                                                  <span>&#10004;
                                                                     {item?.package_service_name.replace(
                                                                        /\_+/g,
                                                                        " ")} </span></span></> : <></>}
                                                            </>)
                                                      })}
                                                   </div>
                                                </div>
                                             </div>
                                             {/* Package Rooms */}
                                             <div className='tour-content-block'>
                                                <div className='pt-4'>
                                                   <div className="accordion-trigger -mt-8">
                                                      <p className='text-white'>{language?.package} {language?.rooms}</p></div>

                                                   {resource?.package_rooms?.map((item, index) => {
                                                      return (
                                                         <span className='capitalize text-gray-400' key={index}>
                                                            {item?.room_name} </span>)
                                                   })}
                                                </div>
                                             </div>

                                             {/* itinerary */}
                                              
                                             <div className="tour-content-block mb-8">
                                                <div className="accordion-trigger mb-4">
                                                   <p className='text-white'>{language?.itinerary}</p></div>
                                                <div className="tour-itinerary">
                                                   <div className="accordion">
                                                      <div
                                                         className="accordion-panel accordion-introduction active"
                                                      >
                                                         <div className="accordion-trigger">
                                                            <p className='text-white'>Introduction</p></div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Start and end in Istanbul! With the Explorer
                                                               tour Best of Turkey by Land, you have a 9 days
                                                               tour package taking you through Istanbul,
                                                               Turkey and 11 other destinations in Turkey.
                                                               Best of Turkey by Land includes accommodation
                                                               in a hotel as well as an expert guide, meals,
                                                               transport and more.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel  accordion-star pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 1:</span> Istanbul
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Istanbul, formerly known as Constantinople, is
                                                               the largest city in Turkey, serving as the
                                                               country`s economic, cultural and historic hub.
                                                               The city straddles the Bosporus strait, lying
                                                               in both Europe and Asia, and has a population
                                                               of over 15 million residents, comprising 19% of
                                                               the population of Turkey. Istanbul is the most
                                                               populous European city, and the world`s
                                                               15th-largest city.
                                                            </p>
                                                            <p>
                                                               The city was founded as Byzantium (Byzantion)
                                                               in the 7th century BC by Greek settlers from
                                                               Megara. In 330 CE, the Roman emperor
                                                               Constantine the Great made it his imperial
                                                               capital, renaming it first as New Rome (Nova
                                                               Roma)and then as Constantinople
                                                               (Constantinopolis) after himself. The city grew
                                                               in size and influence, eventually becoming a
                                                               beacon of the Silk Road and one of the most
                                                               important cities in history.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 2:</span> Gallipoli
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               The Gallipoli peninsula is located in the
                                                               southern part of East Thrace, the European part
                                                               of Turkey, with the Aegean Sea to the west and
                                                               the Dardanelles strait to the east.
                                                            </p>
                                                            <p>
                                                               Gallipoli is the Italian form of the Greek name
                                                               Καλλίπολις (Kallípolis), meaning beautiful
                                                               city, the original name of the modern town of
                                                               Gelibolu. In antiquity, the peninsula was known
                                                               as the Thracian Chersonese.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 3:</span> Troy
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Troy or Ilium was an ancient city located at
                                                               Hisarlik in present-day Turkey, 30 kilometres
                                                               (19 mi) south-west of Çanakkale. It is known as
                                                               the setting for the Greek myth of the Trojan
                                                               War.
                                                            </p>
                                                            <p>
                                                               In Ancient Greek literature, Troy is portrayed
                                                               as a powerful kingdom of the Heroic Age, a
                                                               mythic era when monsters roamed the earth and
                                                               gods interacted directly with humans. The city
                                                               was said to have ruled the Troad until the
                                                               Trojan War led to its complete destruction at
                                                               the hands of the Greeks. The story of its
                                                               destruction was one of the cornerstones of
                                                               Greek mythology and literature, featuring
                                                               prominently in the Iliad and the Odyssey, as
                                                               well as numerous other poems and plays. Its
                                                               legacy played a large role in Greek society,
                                                               with many prominent families claiming descent
                                                               from those who had fought there. In the Archaic
                                                               era, a new city was built at the site where
                                                               legendary Troy was believed to have stood. In
                                                               the Classical era, this city became a tourist
                                                               destination, where visitors would leave
                                                               offerings to the legendary heroes.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 4:</span> Kusadasi
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Kuşadası is a large resort town on Turkey`s
                                                               Aegean coast, and the center of the seaside
                                                               district of the same name within Aydın
                                                               Province. Kuşadası is 95 km (59 mi) south of
                                                               İzmir, and about 60 km (37 mi) from Aydın. The
                                                               municipality`s primary industry is tourism. The
                                                               mayor of the district is Oğuzhan Turan.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 5:</span> Fethiye
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Fethiye, formerly Makri (Greek: Μάκρη), is a
                                                               city and district of Muğla Province in the
                                                               Aegean Region of Turkey. It is one of the
                                                               prominent tourist destinations in the Turkish
                                                               Riviera. In 2019 its population was 162,686.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 6:</span> Oludeniz
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Ölüdeniz is a small neighbourhood and beach
                                                               resort in the Fethiye district of Muğla
                                                               Province, on the Turquoise Coast of
                                                               southwestern Turkey, at the conjunction point
                                                               of the Aegean and Mediterranean sea. It is
                                                               located 14 km (9 mi) to the south of Fethiye,
                                                               near Mount Babadağ.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 7:</span> Dalyan
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Dalyan is a town in Muğla Province located
                                                               between the districts of Marmaris and Fethiye
                                                               on the south-west coast of Turkey. The town is
                                                               an independent municipality, within the
                                                               administrative district of Ortaca.
                                                            </p>
                                                            <p>
                                                               Dalyan achieved international fame in 1987 when
                                                               developers wanted to build a luxury hotel on
                                                               the nearby İztuzu Beach, a breeding ground for
                                                               the endangered loggerhead sea turtle species.
                                                               The incident created major international storm
                                                               when David Bellamy championed the cause of
                                                               conservationists such as June Haimoff, Peter
                                                               Günther, Nergis Yazgan, Lily Venizelos and
                                                               Keith Corbett. The development project was
                                                               temporarily stopped after Prince Philip called
                                                               for a moratorium and in 1988 the beach and its
                                                               hinterland were declared a protected area, viz.
                                                               Köyceğiz-Dalyan Special Environmental
                                                               Protection Area.
                                                            </p>
                                                            <p>
                                                               Life in Dalyan revolves around the Dalyan Çayı
                                                               River which flows past the town. The boats that
                                                               ply up and down the river, navigating the maze
                                                               of reeds, are the preferred means of transport
                                                               to local sites.
                                                            </p>
                                                         </div>
                                                      </div>

                                                      <div className="accordion-panel pb-4">
                                                         <div className="accordion-trigger">
                                                            <span>Day 8:</span> Cappadocia
                                                         </div>
                                                         <div className="accordion-content">
                                                            <p>
                                                               Cappadocia is a historical region in Central
                                                               Anatolia, largely in the Nevşehir, Kayseri,
                                                               Aksaray, Kırşehir, Sivas and Niğde provinces in
                                                               Turkey.
                                                            </p>
                                                            <p>
                                                               Since the late 300s BC the name Cappadocia came
                                                               to be restricted to the inland province
                                                               (sometimes called Great Cappadocia), Upper
                                                               Cappadocia, which alone will be the focus of
                                                               this article. Lower Cappadocia is focused to
                                                               elsewhere.
                                                            </p>
                                                            <p>
                                                               According to Herodotus, in the time of the
                                                               Ionian Revolt (499 BC), the Cappadocians were
                                                               reported as occupying a region from Mount
                                                               Taurus to the vicinity of the Euxine (Black
                                                               Sea). Cappadocia, in this sense, was bounded in
                                                               the south by the chain of the Taurus Mountains
                                                               that separate it from Cilicia, to the east by
                                                               the upper Euphrates, to the north by Pontus,
                                                               and to the west by Lycaonia and eastern
                                                               Galatia.
                                                            </p>
                                                         </div>
                                                      </div>



                                                   </div>
                                                </div>
                                             </div>


                                             {/* Book Now Button */}
                                             <div className='flex pb-8'>
                                                <div className='mr-2 ml-auto justify-end'>
                                                   <button onClick={()=>{  setRate({
                                                         base_rate_amount: resource?.base_rate_amount,
                                                         tax_rate_amount: resource?.tax_rate_amount,
                                                         other_charges_amount: resource?.other_charges_amount,
                                                         base_rate_currency: resource?.base_rate_currency
                                                      })}} 
                                                   className='bg-green-600 sm:inline-flex text-white
            focus:ring-4 focus:ring-green-200 font-semibold text-white 
             rounded-lg text-sm px-4 py-2.5 text-center 
                ease-linear transition-all duration-150'>
                                                     {language?.booknow}
                                                   </button></div>
                                             </div></div>
                                       </div>)
                                 })}

                              </div>
                           </div>:<div></div>}

                        </div>
                     </div>
                  </div>

                  {/*  Reviews */}
                  <div className="tour-content-block">
                     <div className="tour-content-title">
                        <span className='text-white'>{language?.customer} {language?.reviews}</span></div>
                     <div className="tour-reviews">
                        <div className="tour-reviews-feedback-dark">
                        <Marquee duration={10000}  height="360px" className='rounded-lg' axis="Y" reverse={true}>
                           {args?.allHotelDetails?.Reviews?.map((item, idx) => {
                              return (
                                
                                 <div className="tour-reviews-feedback-item bg-gray-900" key={idx}>
                                    <div className="tour-reviews-feedback-content">

                                       <div className="tour-reviews-feedback-content-inner">
                                          <div className="tour-reviews-feedback-title">
                                             <div className={visible === 0 ? 'block w-24 mb-2' : 'hidden'}><LineLoader /></div>
                                             <div className={visible === 1 ? 'block' : 'hidden'}>
                                               <span className='text-white'> {item?.review_author}</span></div>
                                          </div>
                                          <div className="tour-reviews-feedback-text">
                                             <div className={visible === 0 ? 'block h-2 w-64 mb-6' : 'hidden'}><LineLoader /></div>
                                             <div className={visible === 1 ? 'block' : 'hidden'}>
                                                {item?.review_title}</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="tour-reviews-feedback-rating capitalize">{item?.review_rating}</div>
                                 </div>
                                 )
                           })}
                           <hr className="border-white sm:mx-auto" />
                        
                          </Marquee> 
                          </div>
                       
                        <div className="tour-reviews-overall">
                           <div className="tour-reviews-content">
                              <div className="tour-reviews-overall-title">
                              {language?.overallrating}
                              </div>
                              <div className="tour-reviews-overall-text">
                              <p className='text-white'> {language?.excellent}</p>
                              </div>
                              <div className="tour-reviews-overall-rating">
                              <p className='text-white'>4.7</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Booking */}
                  <div id="contactus" className="tour-content-block">
                     <div className="tour-help">
                        <div className="tour-help-inner">
                           <div className="tour-help-content">
                              <div className="tour-help-title">{language?.needhelpbooking}</div>
                              <div className="tour-help-text">
                                 {language?.bookingtitle}
                              </div>
                           </div>
                           <div className="tour-help-call">
                              <span className="material-icons-outlined"> call </span>
                              <div className="tour-help-call-text">
                                 <div className={visible === 0 ? 'block h-2 w-32 mb-6' : 'hidden'}><LineLoader /></div>
                                 <div className={visible === 1 ? 'block' : 'hidden'}>
                                    {args?.phone?.contact_data}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
               {/* content  */}
               <div className="tour-sidebar-dark bg-gray-900 border-0  border-lg">
                  <div className="tour-receipt-dark">
                     <div className="tour-receipt-head">
                        <div className="tour-amount">
                           <div className={visible === 0 ? 'block w-32' : 'hidden'}><SubHeading /></div>
                           <div className={visible === 1 ? 'block text-white' : 'hidden'}>
                          <span className="tour-amount-new">$119</span>
                              {rate?.base_rate_amount} {rate?.base_rate_currency.toUpperCase()}
                              <span>/night</span>
                           </div>
                        </div>
                        <div className={visible === 0 ? 'block w-10 mr-2' : 'hidden'}><SubHeading /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                           <div className="tour-discount">-10%</div>
                        </div>
                     </div>
                     <div className="tour-receipt-select-dark">
                        <div className="tour-receipt-select-top">
                           <div className="tour-receipt-select-item">
                              <div className="tour-receipt-select-icon">
                                 <span className="material-icons-outlined hover:cursor-pointer" onClick={() => setCalendarIn(!calendarIn)} >
                                    calendar_month
                                 </span>
                              </div>
                              <div className="tour-receipt-select-content text-white">
                                 {calendarIn === false ?
                              <div className="tour-receipt-select-title">
                          <span className='text-white' >
                           {d1}
                           </span>
                        </div>:
                                 <input defaultValue={checkinDate} min={checkInDate}
                                 onChange={
                                    (e) => (
                                      changeCheckIn(e.target.value)
                                    )
                                  }
                                 className="my-1 bg-gray-900  text-gray-50
                                 focus:ring-gray-50 focus:border-gray-50 border focus:border-gray-50
                                 text-sm rounded-md block lg:w-16 w-14 mr-1 py-0.5" type="date"  />}
                            <div className="tour-receipt-select-text">
                             {language?.checkin}
                                 </div>
                          </div></div>
                         <div className="tour-receipt-select-item">
                             <div className="tour-receipt-select-icon">    
                                 <span className="material-icons-outlined hover:cursor-pointer" onClick={() => setCalendarOut(!calendarOut)}>
                                    calendar_month
                                 </span>
                              </div>
                              <div className="tour-receipt-select-content">
                              {calendarOut === false ?
                              <div className="tour-receipt-select-title">
                           <span className='text-white'>{d2}</span>
                        </div>:
                                 <input
                                    type="date" defaultValue={checkoutDate} min={checkOutDate}
                                    onChange={
                                       (e) => (
                                         changeCheckOut(e.target.value)
                                       )
                                     }
                                    className="my-1 bg-gray-900  text-gray-50 border focus:border-gray-50
                                    focus:ring-gray-50 focus:border-gray-50 
                                    text-sm rounded-md block lg:w-16 w-14 mr-1 py-0.5" />
                              }
                                 <div className="tour-receipt-select-text">
                                 {language?.checkout}
                                 </div>
                              </div>
                           </div>
                        </div>
                      
                        <div className="tour-receipt-select-bottom">
                        <div className="tour-receipt-select-top">
                        <div className="tour-receipt-select-item">
                              <div className="tour-receipt-select-icon">
                                 <span className="material-icons-outlined hover:cursor-pointer" onClick={() => setGuests(!guests)} >
                                    person_outline
                                 </span>
                              </div>
                              <div className="tour-receipt-select-content">
                              {guests === false ?
                              <div className="tour-receipt-select-title">
                          <span  className='text-white' >{guest} {language?.guests}</span>
                        </div>:
                                 <input
                                    type="number" min={1} defaultValue={guest} 
                                    className=" my-1 bg-gray-900  text-gray-50
                                    border focus:border-gray-50 px-0.5
                                    focus:ring-gray-50 focus:border-gray-50  
                                    text-sm rounded-md block lg:w-16 w-14 mr-1 py-0.5" />
                                    }
                                 <div className="tour-receipt-select-text">
                                    {language?.guests}</div>
                              </div>
                           </div>
                           <div className="tour-receipt-select-item">
                              <div className="tour-receipt-select-icon">
                              <span className="material-icons-outlined hover:cursor-pointer" onClick={() => setChildren(!children)}>
                                    person_outline
                                 </span>
                              </div>
                              <div className="tour-receipt-select-content">
                              {children === false ?
                              <div className="tour-receipt-select-title">
                          <span className='text-white'>{child} Infants</span>
                        </div>:
                                 <input defaultValue={child}
                                    type="number" min={1} 
                                    className=" my-1 bg-gray-900  text-gray-50 px-0.5
                                    border focus:border-gray-50
                                    focus:ring-gray-50 focus:border-gray-50  
                                    text-sm rounded-md block lg:w-16 w-14 mr-1 py-0.5" />
                                    }
                                 <div className="tour-receipt-select-text">
                                 Infants</div>
                              </div>
                           </div>
                        </div>
                           
                        </div>
                   </div>
                     <div className="tour-receipt-detail">
                        <div className="tour-receipt-detail-item">
                           <div className="tour-receipt-detail-title">
                           {language?.baserate}
                           </div>
                           <div className="tour-receipt-detail-price">
                              <div className={visible === 0 ? 'block w-16' : 'hidden'}><SubHeading /></div>
                              <div className={visible === 1 ? 'block text-white' : 'hidden'}>
                                 {rate?.base_rate_amount} {rate?.base_rate_currency.toUpperCase()}</div>
                           </div>
                        </div>
                        <div className="tour-receipt-detail-item">
                           <div className="tour-receipt-detail-title">
                           {language?.taxrate}
                           </div>
                           <div className="tour-receipt-detail-price"> <div className={visible === 0 ? 'block w-16' : 'hidden'}><SubHeading /></div>
                              <div className={visible === 1 ? 'block text-white' : 'hidden'}>
                                 {rate?.tax_rate_amount} {rate?.base_rate_currency.toUpperCase()}</div></div>
                        </div>
                        <div className="tour-receipt-detail-item">
                           <div className="tour-receipt-detail-title">{language?.servicefee}</div>
                           <div className="tour-receipt-detail-price">
                              <div className={visible === 0 ? 'block w-16' : 'hidden'}><SubHeading /></div>
                              <div className={visible === 1 ? 'block text-white' : 'hidden'}>
                                 {rate?.tax_rate_amount} {rate?.base_rate_currency.toUpperCase()}</div></div>
                        </div>
                        <div className="tour-receipt-detail-item tour-receipt-detail-total">
                           <div className="tour-receipt-detail-title">{language?.total}</div>
                           <div className="tour-receipt-detail-price">
                              <div className={visible === 0 ? 'block w-24' : 'hidden'}><SubHeading /></div>
                              <div className={visible === 1 ? 'block text-white' : 'hidden'}>
                                 {Number(rate?.base_rate_amount) + Number(rate?.tax_rate_amount) + Number(rate?.other_charges_amount)} {rate?.base_rate_currency.toUpperCase()}</div>
                           </div></div>
                     </div>
                     <div className="tour-receipt-button-dark">
                        <button className="tour-favorite-dark">
                           <span className="material-icons-outlined text-white">
                              favorite_border
                           </span>
                        </button>
                        <button className="tour-reserve">{language?.booknow}</button>
                     </div>
                  </div>
               </div>
              
            </div>
         </div>
         </div>

         {/* Footer */}
         <footer className="bg-gray-900 lg:mt:8 py-6">
            <div className="md:flex md:justify-between mx-6">
               <div className="mb-6 md:mb-0">
                  <div className="header-logo lg:px-8 md:px-8 px-20">
                     <span className="material-icons-outlined header-logo-icon">
                        mode_of_travel</span>
                     <span className='text-sky-600 text-xl'>
                        <div className={visible === 0 ? 'block w-32 ml-1 mb-2' : 'hidden'}><Headloader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                           {args?.allHotelDetails?.property_name}</div></span>
                  </div>
                  <div className='flex -mt-1 flex-col lg:pl-0 pl-14 md:pl-0'>
                     <span className='lg:px-20 px-16 text-sm text-white'>
                        <div className={visible === 0 ? 'block h-2 w-32 mb-8' : 'hidden'}><LineLoader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>
                           {args?.allHotelDetails?.address?.[i]?.address_street_address}, {args?.allHotelDetails?.address?.[i]?.address_city}
                        </div> </span>
                     <span className='lg:px-20 px-16 text-sm text-white'>
                        <div className={visible === 0 ? 'block h-2 w-32 mb-8' : 'hidden'}><LineLoader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}> {args?.allHotelDetails?.address?.[i]?.address_province}, {args?.allHotelDetails?.address?.[i]?.address_zipcode}
                        </div>
                     </span>
                     <span className='lg:px-20 px-16 text-sm text-white uppercase'>
                        <div className={visible === 0 ? 'block h-2 w-16 mb-8' : 'hidden'}><LineLoader /></div>
                        <div className={visible === 1 ? 'block' : 'hidden'}>India
                        </div></span></div>
               </div>
               <div className=" mt-2 grid grid-cols-2 gap-14 lg:gap-36 sm:grid-cols-3">
                  <div>
                     <h2 className="mb-2 font-semibold text-gray-400 uppercase">{language?.quicklinks}</h2>
                     <ul className="text-white ">
                        <li className="mb-2">
                           <a href="#home" onClick={()=>{ getIPData("Anchor tag Home from footer","/home" ) }} className="hover:underline hover:text-gray-400  text-sm">{language?.home}</a>
                        </li>
                        <li className="mb-2">
                           <a href="#about" onClick={()=>{ getIPData("Anchor tag About from footer","/about" ) }} className="hover:underline hover:text-gray-400 text-sm">{language?.about}</a>
                        </li>
                        <li className="mb-2">
                           <a href="#gallery" onClick={()=>{ getIPData("Anchor tag Gallery from footer","/gallery" ) }}  className="hover:underline hover:text-gray-400 text-sm">{language?.gallery}</a>
                        </li>
                        <li>
                           <a href="#contactus" onClick={()=>{ getIPData("Anchor tag Contact us from footer","/contactus" ) }}  className="hover:underline hover:text-gray-400 text-sm">{language?.contactus}</a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h2 className="mb-2 font-semibold  uppercase text-gray-400">{language?.contactus}</h2>
                     <ul className="text-white">
                        <li className="flex mb-2 hover:text-gray-400">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mr-0.5 mt-1 w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                           </svg>
                           <a href={`tel://${args?.phone?.contact_data}`} onClick={()=>{ getIPData("Anchor tag phone icon from footer","/contactus" ) }} className=" text-sm hover:underline">
                              <div className={visible === 0 ? 'block h-2 w-32 mb-6' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                 {args?.phone?.contact_data}
                              </div></a>
                        </li>
                        <li className="flex hover:text-gray-400">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mr-0.5 w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                           </svg>
                           <a href={`mailto:${args?.email?.contact_data}`}  onClick={()=>{ getIPData("Anchor tag mail from footer","/mailus" ) }} className="text-sm hover:underline">
                              <div className={visible === 0 ? 'block h-2 w-32 mb-6' : 'hidden'}><LineLoader /></div>
                              <div className={visible === 1 ? 'block' : 'hidden'}>
                                 {args?.email?.contact_data} </div></a>
                        </li>
                     </ul>
                  </div>
                  <div className='mr-8'>
                     <h2 className="mb-2  font-semibold text-gray-400 uppercase  dark:text-white">{language?.legal}</h2>
                     <ul className="text-white">
                        <li className="mb-2 flex">
                           <a href="#" onClick={()=>{ getIPData("Anchor tag privacy policy from footer","/privacypolicy" )}} 
                           className="hover:underline hover:text-gray-400 text-sm">
                           {language?.privacypolicy}</a>
                        </li>
                        <li>
                           <a href="#" onClick={()=>{ getIPData("Anchor tag terms and conditions from footer","/termsandconditions" )}}  className="hover:underline hover:text-gray-400 text-sm">{language?.termsandconditions}</a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <hr className="my-6 border-gray-400 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center mx-2 sm:justify-between">
               <span className="text-sm text-white sm:text-center text-white">© 2022 <a href="#" className="hover:underline">{language?.poweredby} Travel2Kashmir</a>. {language?.allrightsreserved}.
               </span>
               <div className="flex mt-4 space-x-6  sm:justify-center sm:mt-0">
                  <a href="#" onClick={()=>{ getIPData("Anchor tag Facebook","/facebok" ) }} className="text-white hover:text-gray-400 dark:hover:text-white">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                     <span className="sr-only">Facebook page</span>
                  </a>
                  <a href="#" onClick={()=>{ getIPData("Anchor tag Instagram","/instagram" ) }} className="text-white hover:text-gray-400 dark:hover:text-white">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                     <span className="sr-only">Instagram page</span>
                  </a>
                  <a href="#" onClick={()=>{ getIPData("Anchor tag Twitter","/twitter" ) }} className="text-white hover:text-gray-400 dark:hover:text-white">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                     <span className="sr-only">Twitter page</span>
                  </a>
                  <a href="#" onClick={()=>{ getIPData("Anchor tag Git Hub","/github" ) }} className="text-white hover:text-gray-400 dark:hover:text-white">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                     <span className="sr-only">GitHub account</span>


                  </a>
                  <div className="flex space-x-4">
                  </div>
               </div>
            </div>
         </footer>
        
         </>
     
   );
}
export default ClassicDark
ClassicDark.getLayout = function PageLayout(page) {
   return (
      <>
         {page}
      </>
   )
}
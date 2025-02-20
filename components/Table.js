import React, { useState, useMemo } from "react";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var checked = [];

const Table = (args) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [error, setError] = useState({});
    const [viewDel, setViewDel] = useState(0);
    const [flag, setFlag] = useState([]);


    const [update, setUpdate] = useState({
        "edit": 0,
        "id": ''
    });

    const [del, setDel] = useState({
        "delete": 0,
        "id": ''
    });

    function myFunction() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
            td = tr[i];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return args?.gen.slice(start, start + itemsPerPage);
    }, [page, args?.gen, itemsPerPage]);

    function ItemShow(event) {
        setItemsPerPage(event.target.value);
    }

    const handlecheckbox = (e) => {
        console.log(e.target)
        const { name, checked } = e.target;
        setViewDel(1);
        if (name === "allSelect") {
            let tempCon = args?.gen.map((item) => {
                return { ...item, isChecked: checked }
            });
            args?.setGen(tempCon)
        }
        else {
            let tempCon = args?.gen.map((item) =>
                item.id === name ? { ...item, isChecked: checked } : item
            );
            args?.setGen(tempCon)
        }

    }

    const allDelete = async () => {
        checked = [];
        checked = args?.gen.filter(i => i.isChecked === true).map(j => { return (j.id) })
        if (checked?.length > 0) {
            setDeleteMultiple(1);
        }
        else {
            toast.warn("No contact selected", {
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

    const [editContact, setEditContact] = useState({});
    const [updateContact, setUpdateContact] = useState({});
    const [deleteContact, setDeleteContact] = useState();
    const [deleteMultiple, setDeleteMultiple] = useState(0);
    const [spinner, setSpinner] = useState(0)


    return (

        <>
            {/* TableHeader */}
            <div className="mx-4">
                <h1 className={`text-xl sm:text-2xl font-semibold ${args?.color?.text}`}>{(args?.name !== "ARI") ? <>{args?.cols?.name}</> : <>{args?.name}</>}</h1>
                <div className="sm:flex">
                    <div className=" sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                        <form className="lg:pr-3" action="#" method="GET">
                            <label htmlFor="users-search" className="sr-only">{args?.common?.search}</label>
                            <div className="mt-1 relative lg:w-64 xl:w-96">
                                <input type="text" name="email" id="myInput" onKeyUp={myFunction}
                                    className={`${args?.color?.greybackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5`} placeholder={args?.common?.Search}>
                                </input>
                            </div>
                        </form>
                        <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                            <span className={`${args?.color?.textgray} hover:${args?.color?.text} cursor-pointer p-1 ${args?.color?.hover} rounded inline-flex justify-center`}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                            </span>

                            <button onClick={allDelete} data-tooltip="Delete" aria-label="Delete" className={`${args?.color?.textgray} hover:${args?.color?.text} cursor-pointer p-1 ${args?.color?.hover} rounded inline-flex justify-center`}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            </button>



                            <span className={`${args?.color?.textgray} hover:${args?.color?.text} cursor-pointer p-1 ${args?.color?.hover} rounded inline-flex justify-center`}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            </span>
                            <span className={`${args?.color?.textgray} hover:${args?.color?.text} cursor-pointer p-1 ${args?.color?.hover} rounded inline-flex justify-center`}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                            </span>
                        </div>
                    </div>
                    {((args?.name != "Services") && (args?.name != "ARI") && (args?.name != "Inventory")) ?
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex  
                             font-semibold
                                    rounded-lg text-sm px-5 py-2 text-center 
                              items-center ease-linear transition-all duration-150" onClick={args?.add} >
                                {args?.common?.Add}</button>
                            {/* <span className={`w-1/2 ${args?.color?.text} ${args?.color?.whitebackground} border border-gray-300 ${args?.color?.hover} focus:ring-4 focus:ring-cyan-200 font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto`}>
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                                {args?.common?.Import}
                            </span> */}
                        </div> : <>
                        </>}
                    {args?.name === "ARI" ?
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex  
                             font-semibold
                                rounded-lg text-sm px-5 py-2 text-center 
                              items-center ease-linear transition-all duration-150" onClick={args?.addNotif} >
                                {args?.lang?.addratenotif}</button>
                            <span onClick={args?.add} className={`w-1/2 ${args?.color?.text} ${args?.color?.whitebackground} border hover:cursor-pointer border-gray-300 ${args?.color?.hover}  focus:ring-4 focus:ring-cyan-200 font-semibold inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto`}>
                                {args?.lang?.generatetransaction}
                            </span>
                        </div> :
                        args?.name === "Inventory" ?
                            <></>
                            : <>
                            </>}
                </div>
            </div>
            {/* Table */}
            <div className="flex flex-col mt-8 lg:-mr-20 sm:mr-0">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table data table-fixed min-w-full divide-y divide-gray-200" id="myTable">
                                <thead className={` ${args?.color?.tableheader} `}>
                                    <tr>
                                        {args?.name != "Services" ?
                                            <th scope="col" className="p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox"
                                                        name="allSelect" checked={args?.gen?.filter(item => item?.isChecked !== true).length < 1}
                                                        onChange={(e) => { handlecheckbox(e); setViewDel(1); }}
                                                        className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                </div>
                                            </th> : <></>}
                                        <th scope="col"
                                            className={`p-4 text-left text-xs font-semibold ${args?.color?.textgray} uppercase`}>{args?.cols?.col1}</th>

                                        {args?.name != "Packages" ?
                                            <th scope="col"
                                                className={`p-4 text-left text-xs font-semibold ${args?.color?.textgray} uppercase`}>{args?.cols?.col2}</th>
                                            :
                                            <></>}
                                        {args?.status != "matchstatus" && args?.mark != "beds" ?
                                            <th scope="col"
                                                className={`p-4 text-left text-xs font-semibold ${args?.color?.textgray} uppercase`}>{args?.common?.Status}</th>
                                            : <></>}
                                        <th scope="col"
                                            className={`p-4 text-left text-xs font-semibold ${args?.color?.textgray} uppercase`}>{args?.common?.Action}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={` ${args?.color?.whitebackground} divide-y  divide-gray-200`} id="TableList" >
                                    {displayData?.map((item, idx) => (
                                        <>
                                            {update?.edit === 1 && update?.id === idx ?
                                                //After Edit
                                                <>
                                                    <tr className={`${args?.color?.hover}`}>
                                                        {args?.name != "Services" ?
                                                            <td className="p-4 w-4">
                                                                <span className="flex items-center">
                                                                    <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox"
                                                                        className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                                    <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                                </span>
                                                            </td> : <></>}
                                                        {(args?.name != "Additional Services" && args?.name != "Package Miles" && args?.name != "Elite Rewards") ?
                                                            <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${args?.color?.text}`}>
                                                                {item?.name}</td>
                                                            :
                                                            <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${args?.color?.text}`}>


                                                                <input type="text"
                                                                    onChange={(e) => setEditContact({ ...editContact, name: e.target.value }, setFlag(1))} className={`shadow-sm capitalize ${args?.color?.whitebackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}
                                                                    defaultValue={item?.name}></input> </td>}

                                                        {args?.name != "Services" ?


                                                            <td className="data text-left text-sm font-semibold  ">

                                                                <input type="text"
                                                                    onChange={(e) => setEditContact({ ...editContact, type: e.target.value }, setFlag(1))}
                                                                    className={`shadow-sm  ${args?.color?.whitebackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}
                                                                    defaultValue={item?.type}></input>

                                                            </td>
                                                            :

                                                            <td className="data text-left text-sm font-semibold  ">

                                                                {item?.type === 'yes' || item?.type === 'no' ?
                                                                    <div className="flex">
                                                                        <div className="form-check mx-2 form-check-inline">

                                                                            <label htmlFor={`default-toggle${idx}`} className="inline-flex relative items-center cursor-pointer">
                                                                                <input type="checkbox" value={editContact?.type} checked={editContact.type === "yes"}
                                                                                    onChange={(e) => (setEditContact({ ...editContact, type: editContact.type === "yes" ? "no" : "yes" }), setFlag(1))}
                                                                                    id={`default-toggle${idx}`} className="sr-only peer" />

                                                                                <div
                                                                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                                                             rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                  after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                                                                            </label>
                                                                        </div>
                                                                    </div> :
                                                                    <div>
                                                                        {(() => {
                                                                            switch (item?.id) {
                                                                                case 'ser0016': return (<div>
                                                                                    {/*Kitchen Availability*/}
                                                                                    <select onClick={(e) => (setEditContact({ ...editContact, type: e.target.value }, setFlag(1)))}

                                                                                        className={`shadow-sm ${args?.color?.greybackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}>

                                                                                        <option select>{item?.type}</option>
                                                                                        <option value="Available in all rooms">Available in all rooms</option>
                                                                                        <option value="Available in some rooms">Available in some rooms</option>
                                                                                        <option value="Not available">Not available</option>
                                                                                    </select>
                                                                                </div>)
                                                                                case 'ser0017': return (<div>
                                                                                    {/*Parking Type*/}

                                                                                    <select onClick={(e) => (setEditContact({ ...editContact, type: e.target.value }, setFlag(1)))} className={`shadow-sm ${args?.color?.greybackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`} >

                                                                                        <option select>{item?.type}</option>
                                                                                        <option value="No payment required">No Payment Required</option>
                                                                                        <option value="Paid">Paid</option>
                                                                                        <option value="Not available">Not available</option>
                                                                                    </select>
                                                                                </div>)
                                                                                case 'ser0020': return (<div>
                                                                                    {/*Swimming Pool*/}

                                                                                    <select onClick={(e) => (setEditContact({ ...editContact, type: e.target.value }, setFlag(1)))}
                                                                                        className={`shadow-sm ${args?.color?.greybackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`} >

                                                                                        <option select>{item?.type}</option>
                                                                                        <option value="Indoors">Indoors</option>
                                                                                        <option value="Outdoors">Outdoors</option>
                                                                                        <option value="Indoors and outdoors">Indoors and Outdoors</option>
                                                                                        <option value="Not available">Not available</option>
                                                                                    </select>
                                                                                </div>)
                                                                                case 'ser0022': return (<div>
                                                                                    {/*Wifi Type*/}

                                                                                    <select onClick={(e) => (setEditContact({ ...editContact, type: e.target.value }, setFlag(1)))}
                                                                                        className={`shadow-sm ${args?.color?.greybackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-64 p-2.5`}>

                                                                                        <option select>{item?.type}</option>
                                                                                        <option value="No payment required">No Payment Required</option>
                                                                                        <option value="Paid">Paid</option>
                                                                                        <option value="Not available">Not available</option>
                                                                                        <option value="Not available">Not available</option>
                                                                                    </select>
                                                                                </div>)
                                                                                default: return (<div></div>)
                                                                            }
                                                                        })()}
                                                                    </div>

                                                                }
                                                            </td>

                                                        }
                                                        {args?.mark !== "beds" ?
                                                            <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${args?.color?.text}`}>
                                                                <div className="flex">
                                                                    <div className="form-check mx-2 form-check-inline">

                                                                        <label htmlFor={`default${idx}`} className="inline-flex relative items-center cursor-pointer">
                                                                            <input type="checkbox" checked={editContact?.status === true} value={editContact?.status}
                                                                                onChange={(e) => (setEditContact({ ...editContact, status: !editContact.status }), setFlag(1))}
                                                                                id={`default${idx}`} className="sr-only peer" />
                                                                            <div
                                                                                className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                               dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                               peer-checked:after:translate-x-full 
                               peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                               after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                                after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </td> : <></>}

                                                        <td className="p-4 whitespace-nowrap space-x-2">
                                                            {
                                                                (flag.length === 0) ?

                                                                    <button className="bg-gradient-to-r bg-green-600 hover:bg-green-700 text-white  sm:inline-flex 
                                                           font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all
                                                            duration-150 cursor-not-allowed opacity-60 "
                                                                    >{args?.common?.Save} </button>

                                                                    :
                                                                    <button className="bg-gradient-to-r bg-green-600 hover:bg-green-700 text-white  sm:inline-flex 
                                                          font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all
                                                           duration-150"
                                                                        onClick={() => { if (flag.length != 0) { { setUpdate({ ...update, edit: 0, id: '' }) }; args.edit(editContact, updateContact); setFlag([]) } }}
                                                                    >{args?.common?.Save}</button>


                                                            }

                                                            <button className="bg-gradient-to-r bg-gray-400 hover:${args?.color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                onClick={() => { setUpdate({ ...update, edit: 0, id: '' }) }}>{args?.common?.Cancel}</button>
                                                        </td>
                                                    </tr>
                                                </>


                                                :
                                                //Before Edit
                                                <>
                                                    <tr>
                                                        {args?.name != "Services" ?
                                                            <td className="p-4 w-4">
                                                                <span className="flex items-center">
                                                                    <input id="checkbox-1" name={item?.id} checked={item.isChecked || false}
                                                                        onChange={(e) => { handlecheckbox(e); setViewDel(1); }}
                                                                        aria-describedby="checkbox-1" type="checkbox"
                                                                        className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                                                                    <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                                </span>
                                                            </td> : <></>}
                                                        <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${args?.color?.text}`}>
                                                            {item?.name}
                                                        </td>
                                                        {args?.name === "Packages" ? <></> :

                                                            <td className={`p-4 whitespace-nowrap text-base font-normal ${args?.color?.text}`}>

                                                                {item?.type}
                                                            </td>}
                                                        {args?.mark !== "beds" ?
                                                            <>
                                                                {item?.status == true ?
                                                                    <td className={`p-4 whitespace-nowrap capitalize text-base font-normal ${args?.color?.text}`}>
                                                                        <span className="flex items-center">
                                                                            <span className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></span>
                                                                            {args?.common?.Active}
                                                                        </span>
                                                                    </td> :
                                                                    args?.status === "matchstatus" ? <></> :

                                                                        <td className={`p-4 whitespace-nowrap text-base font-normal ${args?.color?.text}`}>

                                                                            <span className="flex items-center">
                                                                                <span className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></span>
                                                                                {args?.common?.Inactive}
                                                                            </span>
                                                                        </td>}</> : <></>}

                                                        {del?.delete === 1 && del?.id === idx ?

                                                            <td className="p-4 whitespace-nowrap  space-x-2">

                                                                <button className="bg-gradient-to-r bg-red-600 hover:bg-red-700 text-white  sm:inline-flex  
                                                                 font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"

                                                                    onClick={() => { { setDel({ ...del, delete: 0, id: '' }) }; args.delete(item?.id) }} >{args?.common?.yesdelete}</button>
                                                                <button className="bg-gradient-to-r bg-gray-400 hover:${args?.color?.greybackground}0 text-white sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                    onClick={() => { setDel({ ...del, delete: 0, id: '' }) }} >{args?.common?.Cancel}</button>
                                                            </td>
                                                            :
                                                            <td className="py-4 whitespace-nowrap capitalize">


                                                                {
                                                                    (args?.name != "Rooms") && (args?.name != "Packages") && (args?.name != "ARI") && (args?.name != "Inventory") ?
                                                                        <>


                                                                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150" onClick={() => {
                                                                                setEditContact(item);
                                                                                setUpdateContact(item);
                                                                                setUpdate({ ...update, edit: 1, id: idx })
                                                                            }}>{args?.common?.Edit} </button>


                                                                            {args?.name != "Services" ?
                                                                                <button className="bg-gradient-to-r ml-2 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                                    onClick={() => {
                                                                                        setDeleteContact(item);
                                                                                        setDel({ ...del, delete: 1, id: idx })
                                                                                    }} >

                                                                                    {args?.common?.Delete}</button> : <></>}
                                                                        </>


                                                                        :
                                                                        // Room Button
                                                                        <div>
                                                                            <button className="bg-gradient-to-r bg-cyan-600 hover:bg-cyan-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                                onClick={
                                                                                    () => {
                                                                                        args.edit(item)
                                                                                    }}>
                                                                                {args?.name !== "ARI" && args?.name !== "Inventory" ?
                                                                                    <>{args?.common?.Edit} </> : args?.name === "Inventory" ? <>{args?.view}</> : <>{args?.lang?.availability}</>}
                                                                            </button>
                                                                            {args?.name !== "ARI" && args?.name !== "Inventory" ?
                                                                                <button className="bg-gradient-to-r mx-2 bg-red-600 hover:bg-red-700 text-white  sm:inline-flex font-semibold rounded-lg text-sm px-5 py-2 text-center items-center ease-linear transition-all duration-150"
                                                                                    onClick={() => {
                                                                                        setDeleteContact(item);
                                                                                        setDel({ ...del, delete: 1, id: idx })
                                                                                    }} >{args?.common?.Delete}</button> : <></>}
                                                                        </div>

                                                                }
                                                            </td>}
                                                    </tr>
                                                </>}
                                        </>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div></div></div>

            {/* Pagination */}
            <div className={`${args?.color?.whitebackground} sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4`}>
                <div className="flex items-center w-64 mb-4 sm:mb-0">
                    <button onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                        }

                    }} className={`${args?.color?.textgray} hover:${args?.color?.text} cursor-pointer p-1 ${args?.color?.hover} rounded inline-flex justify-center`}>
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </button>

                    <button onClick={() => {
                        if (page < Math.ceil(args?.gen?.length / itemsPerPage)) {
                            setPage(page + 1);

                        }
                    }} className={`${args?.color?.textgray} hover:${args?.color?.text} cursor-pointer p-1 ${args?.color?.hover} rounded inline-flex justify-center mr-2`}>
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </ button>

                    <span className={`text-sm font-normal ${args?.color?.textgray}`}>{args?.common?.Showing}

                        <span className={`${args?.color?.text} font-semibold ml-1`}>{page}</span> {args?.common?.Of} <span className={`${args?.color?.text} font-semibold`}>{Math.ceil(args?.gen?.length / itemsPerPage)}</span></span>

                </div>

                <div className="flex items-center w-42 space-x-3">
                    <span className={`text-sm font-normal ${args?.color?.textgray}`}>Entries per page</span>
                    <select onChange={(e) => ItemShow(e)} className={`shadow-sm ${args?.color?.greybackground} border border-gray-300 ${args?.color?.text} sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block mr-2 w-12 px-3  py-1`}>
                        <option selected disabled>{itemsPerPage}</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>

                </div>
            </div>

            {/* Modal Delete */}
            <div className={deleteMultiple === 1 ? 'block' : 'hidden'}>
                <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 backdrop-blur-xl bg-black/30 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full">
                    <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                        <div className={`rounded-lg shadow relative ${args?.color?.whitebackground}`}>
                            <div className="flex justify-end p-2">
                                <button
                                    onClick={() => setDeleteMultiple(0)}
                                    type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-user-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>

                            <div className="p-6 pt-0 text-center">
                                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className={`text-base font-normal ${args?.color?.deltext} mt-5 mb-6`}>
                                    {args?.language?.areyousureyouwanttodelete}
                                </h3>

                                {spinner === 0 ?
                                    <>
                                        <Button Primary={args?.language?.Delete} onClick={() => { args?.deleteAll(checked, setDeleteMultiple) }} />
                                        <Button Primary={args?.language?.Cancel} onClick={() => setDeleteMultiple(0)} />
                                    </>
                                    :
                                    <Button Primary={args?.language?.SpinnerDelete} />}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
export default Table



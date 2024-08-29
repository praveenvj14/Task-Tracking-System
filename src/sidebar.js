// Sidebar.js
import "./sidebar.css"
import React, { useState } from 'react';
import { TbListDetails } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineNoteAdd } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import {
    FaBars,
    FaUserAlt,
    FaRegChartBar,   
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { MdMarkEmailRead } from "react-icons/md";
import { SiCodingame } from "react-icons/si";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Project-details",
            name:"Employee Project Details",
            icon:<HiUserGroup />
        },
        {
            path:"/add-Project-list",
            name:"Add Project List",
            icon:<MdOutlineNoteAdd />

        },
        {
            path:"/add-Client-details",
            name:"Add Client Details",
            icon:<FaRegChartBar/>
        },
        {
            path:"/New-dep",
            name:"New Departments",
            icon:<GrUserWorker />

        },
        // {
        //     path:"/Password",
        //     name:"Change Password",
        //     icon:<RiLockPasswordFill />
        // },
        {
            path:"/employee-list",
            name:"View Employee Details",
            icon:<SiCodingame />
        },
        {
            path:"/Project-list",
            name:"View Project List",
            icon:<FaListUl />

        },
        {
            path:"/Client-details",
            name:"View Client Details",
            icon:<TbListDetails />
        },
        {
          path:"/send-email",
          name:"Send Email",
          icon:<MdMarkEmailRead />
      },
    //   {
    //     path:"/New-head",
    //     name:"New project Head",
    //     icon:<FaHeadSideCough />
    // },
//     {
//       path:"/Coding",
//       name:"View Coding Details",
//       icon:<SiCodingame />
//   },
    ]
    return (
        <div className="sidebar1">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Menu</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;
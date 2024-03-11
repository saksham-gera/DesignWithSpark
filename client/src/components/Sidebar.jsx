import React, { useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './Auth';


export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);
    const [selected, setSelected] = useState(0);
    const { logout } = useAuth();
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        setSelected(pathname == '/dashboard' ? 0 : pathname == '/createnew' ? 1 : pathname == '/editor' ? 2 : pathname == '/inventory' ? 3 : 0)
    }, [location])

    const mainMenuData = [
        {
            name: "Dashboard",
            route: "/dashboard",
            icon: <SpaceDashboardIcon fontSize='small' />
        },
        {
            name: "Create New",
            route: "/createnew",
            icon: <AddIcon fontSize='small' />
        },
        {
            name: "Editor",
            route: "/editor",
            icon: <BorderColorIcon fontSize='small' />
        },
        {
            name: "Inventory",
            route: "/inventory",
            icon: <InventoryIcon fontSize='small' />
        }
    ];


    // console.log(window.innerHeight());
    return (
        <motion.div
            animate={{ width: expanded ? `${0.20 * window.innerWidth}px` : "56px", transition: { duration: 0.6, type: "spring" } }}
            transition={{ type: 'spring', stiffness: 100 }} className="sticky top-0 h-screen bg-[#1b1b25]  text-white">
            <div className={expanded ? "  p-6 flex justify-between text-2xl font-bold" : "pt-6 pb-6 flex justify-center"}>
                <div className={expanded ? "flex" : "hidden"}>
                    DesignWithSpark
                </div>
                <IconButton onClick={() => { setExpanded(!expanded) }} style={{ color: "white" }}>
                    {expanded ? <ArrowBackIosNewIcon color='white' /> : <ArrowForwardIosIcon color='white' />}
                </IconButton>
            </div>

            <div className="select-none cursor-pointer w-full flex-col justify-center items-center menuItems">
                <div className="ml-4 opacity-60 font-bold text-sm menuItemsHeading">
                    {expanded && "Main Menu"}
                </div>

                {
                    mainMenuData.map((item, index) => {
                        return (
                            <Link to={item.route} style={{ textDecoration: "none" }}>
                                <div onClick={() => setSelected(index)} className={selected == index ? "hover:bg-[#222831] text-[#76ABAE] border-solid border-r-8 border-transparent border-[#76ABAE]" : "hover:bg-[#222831] border-solid border-r-8 border-transparent hover:border-[#76ABAE]"}>
                                    <div className={expanded ? "w-full pl-6 pt-3 pb-3 flex justify-center items-center " : "pt-3 pb-3 w-full flex justify-center"}>
                                        {item.icon}
                                        <div className={expanded ? "flex w-full pl-2 text-md" : "hidden"}>
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        );
                    }
                    )
                }
                <div className="mt-12 ml-4 opacity-60 font-bold text-sm menuItemsHeading">
                    {expanded && "Account"}
                </div>


                <div onClick={logout} className="hover:bg-[#222831] border-solid border-r-8 border-transparent hover:border-[#76ABAE]">
                    <Link to='/'>
                        <div className={expanded ? "w-full pl-6 pt-3 pb-3 flex justify-center items-center " : "pt-3 pb-3 w-full flex justify-center"}>
                            <ExitToAppIcon fontSize='small' />
                            <div className={expanded ? "flex w-full pl-2 text-md" : "hidden"}>
                                Logout
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

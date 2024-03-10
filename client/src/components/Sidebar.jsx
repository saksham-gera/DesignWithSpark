import React, { useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CalendarTodaySharpIcon from '@mui/icons-material/CalendarTodaySharp';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';



export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);
    const [selected, setSelected] = useState(0);

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
            name: "Inventory",
            route: "/inventory",
            icon: <InventoryIcon fontSize='small' />
        },
        {
            name: "Calender",
            route: "/calender",
            icon: <CalendarTodaySharpIcon fontSize='small'/>
        },
        {
            name: "Fitness Goals",
            route: "/fitnessgoals",
            icon: <SportsGymnasticsIcon fontSize='small' />
        },
    ];

    const accountData = [
        {
            name: "Information",
            route: "/information",
            icon: <InfoIcon fontSize='small' />
        },
        {
            name: "Settings",
            route: "/settings",
            icon: <SettingsIcon fontSize='small' />
        },
        {
            name: "Logout",
            route: "/logout",
            icon: <ExitToAppIcon fontSize='small' />
        },
    ];

    // console.log(window.innerHeight());
    return (
        <motion.div
            animate={{ width: expanded ? `${0.20*window.innerWidth}px` : "56px", transition: { duration: 0.6, type: "spring" } }}
            transition={{ type: 'spring', stiffness: 100 }} className="sticky top-0 h-screen bg-white text-black">
            <div className={expanded ? "p-6 flex justify-between text-2xl font-bold" : "pt-6 pb-6 flex justify-center"}>
                <div className={expanded ? "flex" : "hidden"}>
                    Fitness
                </div>
                <IconButton onClick={() => { setExpanded(!expanded) }} color='#ffffff'>
                    {expanded ? <ArrowBackIosNewIcon color='black' /> : <ArrowForwardIosIcon color='black' />}
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
                                <div onClick={() => setSelected(index)} className={selected == index ? "hover:bg-blue-100 text-[#3b4df8] border-solid border-r-8 border-transparent border-[#3b4df8]" : "hover:bg-blue-100 border-solid border-r-8 border-transparent hover:border-[#3b4df8]"}>
                                    <div className={expanded ? "w-full pl-6 pt-3 pb-3 flex justify-center items-center " : "pt-3 pb-3 w-full flex justify-center"}>
                                        {item.icon}
                                        <div className={expanded ? "flex w-full pl-2 text-sm" : "hidden"}>
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
                {
                    accountData.map((item, index) => {
                        return (
                            <Link to={item.route} style={{ textDecoration: "none" }}>
                                <div onClick={() => setSelected(mainMenuData.length + index)} className={selected == mainMenuData.length + index ? "hover:bg-blue-100 text-[#3b4df8] border-solid border-r-8 border-transparent border-[#3b4df8]" : "hover:bg-blue-100 border-solid border-r-8 border-transparent hover:border-[#3b4df8]"}>
                                    <div className={expanded ? "w-full pl-6 pt-3 pb-3 flex justify-center items-center " : "pt-3 pb-3 w-full flex justify-center"}>
                                        {item.icon}
                                        <div className={expanded ? "flex w-full pl-2 text-sm" : "hidden"}>
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                    )
                }
            </div>
        </motion.div>
    )
}


import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {mockAccountData} from '../mock.js';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton } from '@mui/material';
import { useAuth } from './Auth.jsx';


export default function TopBar() {
    const { pathname } = useLocation();

    const {userDetails} = useAuth();

    let pageName =
        pathname == "/dashboard"
            ? "Dashboard"
            : pathname == "/createnew"
                ? "Create New Design"
                : pathname == "/editor"
                    ? "Customise Your Design"
                        : pathname == "/aboutus"
                            ? "About Us"
                                : pathname == "/customize"
                                    ? "Customize"
                                        : pathname == "/orders"
                                            ? "Orders" 
                                                : "Error 404";



  return (
    <div className='flex py-4 sticky top-0 bg-white z-10 text-black items-center justify-between w-full topBar'>
        <div className="ml-4 font-semibold text-xl selectedMenuItem">
            {pageName}
        </div>
        <div className="flex items-center justify-evenly w-72 accountButtons">
            <div className="flex justify-center items-center profile">
                <div className="profile-pic h-8 w-8">
                    <img src={mockAccountData.profilePicture} alt="profile-pic" className="object-fill rounded profile-pic" />
                </div>
                <div className="profile-data">
                    <div className="text-sm ml-2 m-1 font-bold profile-name">
                       {userDetails.name}
                    </div>
                    <div className="text-xs ml-2 m-1 profile-email">
                        {userDetails.email}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

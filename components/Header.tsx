"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/dashboard/action";

const Header = () => {
    const [isToggled_new, setIsToggled_new] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

    const toggleMenu = () => {
        setIsToggled_new((prev) => !prev);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsToggled_new(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className="header_mainbox">
                <div className="header_profile_namebox">
                    <h1>Welcome to <span>Rahul Rathod</span></h1>
                </div>
                <div className="header_right_listing">
                    <div className="notification_iconbox">
                        <img src="/images/service-center/notification-on.svg" alt="Notification icon" className="img-fluid" />
                    </div>
                    <div title="Logout" className="logout_iconbox" onClick={logout} style={{ cursor: "pointer" }}>
                        <img src="/images/service-center/logout.svg" alt="Logout icon" className="img-fluid" />
                    </div>
                    {/* <div className="logout_iconbox">
                    <img src="/images/service-center/logout.svg" alt="Logout icon" className="img-fluid" />
                    </div> */}
                    <div className="profile_imagebox">
                    <img src="/images/service-center/user.png" alt="Profile image" className="img-fluid" />
                    </div>
                    <div className="service_center_logo">
                    <img src="/images/service-center/service-center-logo.png" alt="Service center logo" className="img-fluid" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

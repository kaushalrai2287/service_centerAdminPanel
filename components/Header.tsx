"use client";
import React, { useState, useEffect, useRef } from "react";
import { logout } from "@/app/dashboard/action";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

const Header = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isToggled_new, setIsToggled_new] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error("Error fetching user:", userError);
                return;
            }

            if (user) {
                const service_center_auth_id = user.id;

              
                let { data: serviceCenter, error: serviceCenterError } = await supabase
                    .from("service_centers")
                    .select("name")
                    .eq("auth_id", service_center_auth_id)
                    .single();

                if (serviceCenterError || !serviceCenter) {
                    console.log("User not found in service_centers, searching in users table...");

                   
                    const { data: userData, error: userError } = await supabase
                        .from("users")
                        .select("name")
                        .eq("auth_id", service_center_auth_id)
                        .single();

                    if (userError || !userData) {
                        console.error("Error fetching user name:", userError);
                        setUserName("Guest"); // Fallback if name is not found in both tables
                    } else {
                        setUserName(userData.name);
                    }
                } else {
                    setUserName(serviceCenter.name);
                }
            }
        };

        fetchUser();
    }, []);

    const toggleMenu = () => {
        setIsToggled_new((prev) => !prev);
    };

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
                    <h1>Welcome <span>{userName}</span></h1>
                </div>
                <div className="header_right_listing">
                    <div className="notification_iconbox">
                        <img src="/images/service-center/notification-on.svg" alt="Notification icon" className="img-fluid" />
                    </div>
                    <div title="Logout" className="logout_iconbox" onClick={logout} style={{ cursor: "pointer" }}>
                        <img src="/images/service-center/logout.svg" alt="Logout icon" className="img-fluid" />
                    </div>
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

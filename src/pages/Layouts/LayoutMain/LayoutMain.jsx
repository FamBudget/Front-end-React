import React, {useEffect, useState} from "react";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import styles from './LayoutMain.module.scss'
import {Sprite} from "../../../components";
import {useNavigate, Outlet} from "react-router-dom";
import {setAuth, setEmail} from "../../../redux/reducers/AuthReducer";
import {useDispatch} from "react-redux";
import {Header} from "../../../components/Header/Header";

export const LayoutMain = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const navigate = useNavigate();

    useEffect(() => {
        open && (document.body.style.overflow = 'hidden')
        !open && (document.body.style.overflow = 'unset')
    }, [open])

    useEffect(() => {

        localStorage.token && dispatch(setAuth(localStorage.token));
        localStorage.email && dispatch(setEmail(localStorage.email)) && dispatch(setAuth(localStorage.email));
        !localStorage.token && !localStorage.email && navigate('/login');
    }, []);
    const sidebarClass = styles.container
        + (open ? ' ' + styles.open : '')
    return (
        <>
            {open && <div className={styles.background} onClick={handleClose}/>}

            <Header handleOpen={handleOpen}/>
            <div className={sidebarClass}>
                <Sidebar handleClose={handleClose}/>
            </div>

            <Sprite/>
            <Outlet/>
        </>
    );
};

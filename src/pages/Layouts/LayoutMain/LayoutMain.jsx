import React, {useEffect} from "react";
import {Sidebar} from "../../../components/Sidebar/Sidebar";
import styles from './LayoutMain.module.scss'
import {Sprite} from "../../../components";
import {Outlet} from "react-router-dom";
import {setAuth, setEmail} from "../../../redux/reducers/AuthReducer";
import {useDispatch} from "react-redux";
import {Header} from "../../../components/Header/Header";

export const LayoutMain = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        localStorage.token && dispatch(setAuth(localStorage.token));
        localStorage.email && dispatch(setEmail(localStorage.email)) && dispatch(setAuth(localStorage.email));
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <Sidebar/>
            </div>

            <Sprite/>
            <Outlet/>
        </>
    );
};

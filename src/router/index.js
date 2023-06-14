import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import {AuthPage} from "../pages/AuthPage/AuthPage";
import {Layout} from "../pages/Layouts/LayoutAuth";
import {Operations} from "../pages/Operations/Operations";
import {Accounts} from "../pages/Accounts/Accounts";
import {LayoutMain} from "../pages/Layouts/LayoutMain/LayoutMain";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/login" element={<AuthPage/>}/>
            </Route>
            <Route path="/" element={<LayoutMain/>}>
                <Route path="/operations" element={<Operations/>}/>
                <Route path="/accounts" element={<Accounts/>}/>
            </Route>
        </>
    )
);

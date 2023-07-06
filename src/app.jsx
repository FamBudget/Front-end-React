import React from 'react'
import {Route, Routes} from "react-router-dom";
import {Layout} from "./pages/Layouts/LayoutAuth";
import {AuthPage} from "./pages/AuthPage/AuthPage";
import {LayoutMain} from "./pages/Layouts/LayoutMain";
import {Operations} from "./pages/Operations";
import {Accounts} from "./pages/Accounts";
import {Income} from "./pages/Income/Income";
import {Expense} from "./pages/Expense/Expense";


const App = () => {
    return (
        <>
            <Routes>
                <Route path="/"  element={<Layout/>}>
                    <Route index element={<AuthPage/>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                </Route>
                <Route path="/" element={<LayoutMain/>}>
                    <Route path="/operations" element={<Operations/>}/>
                    <Route path="/accounts" element={<Accounts/>}/>
                    <Route path="/income" element={<Income/>}/>
                    <Route path="/expense" element={<Expense/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default App;
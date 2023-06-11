import React, {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Sprite} from "../../../components";
import {useDispatch} from "react-redux";
import {setAuth} from "../../../redux/reducers/AuthReducer";
import {RecoveryPassword} from "../../../components/RecoveryPassword";

export const Layout = () => {
    const search = useLocation().search
    const searchParams = new URLSearchParams(search)
    const code = searchParams.get('code')
    const email = searchParams.get('email')
    const [isOpenRecover, setIsOpenRecovery] = useState(!!code);

    const dispatch = useDispatch();


  useEffect(() => {
    localStorage.token && dispatch(setAuth(localStorage.token));
    localStorage.email && dispatch(setAuth(localStorage.email));
  }, []);

  return (
    <>
      <Sprite />
      <Outlet />
        {isOpenRecover && (
            <RecoveryPassword code={code} email={email} setIsOpenRecovery={setIsOpenRecovery} />
        )}
    </>
  );
};

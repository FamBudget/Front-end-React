import React, {useEffect, useState} from 'react'
import {SettingsMenu} from "./SettingsMenu";
import {useDispatch, useSelector} from "react-redux";
import {changePassword, deleteUser, editUser, fetchUser} from "../../redux/reducers/UserReducer";
import {Profile} from "./Profile";
import {setAuth} from "../../redux/reducers/AuthReducer";
import {useNavigate} from "react-router-dom";
import {EditPassword} from "./EditPassword";
import {AccountsSettings} from "./AccountsSettings";
import {CategorySettings} from "./CategorySettings";


export const SettingsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    const editUSer = (values) => {
        dispatch(editUser(values))
    }
    const deleteProfile = () => {
        dispatch(deleteUser()).then(() => {
            dispatch(setAuth(null));
            localStorage.clear()
            navigate('/login')
        });

    }

    const changePasswordUser = (values) => {
        dispatch(changePassword(values))
    }


    const dataUser = useSelector(state => state.user)
    const [active, setActive] = useState(0)
    return <div>
        <SettingsMenu active={active} setActive={setActive}/>
        {
            (active === 0) ? <Profile dataUser={dataUser} editUSer={editUSer} deleteProfile={deleteProfile}/> :
                (active === 1) ? <EditPassword changePassword={changePasswordUser}/> :
                    (active===2) ? <AccountsSettings /> : <CategorySettings />
        }

    </div>
}
import React, {useState} from 'react'
import styles from "./SettingsMenu.module.scss";
import {Button} from "../Button";
import {DeleteUser} from "./DeleteUser";


export const Profile = ({dataUser, editUSer, deleteProfile}) => {
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({
        currency: dataUser.currency,
        email: dataUser.email,
        firstName: dataUser.firstName,
        id: dataUser.id,
        lastName: dataUser.lastName
    })
    const submitEdit = () => {
        setEdit(false);
        editUSer(user)
    }
    return <div className={styles.wrapper}>

        <div className={styles.header}>
        </div>
        <label>Электронная почта</label>
        <div className={styles.row}><input
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.currentTarget.value})}
            placeholder={dataUser.email}
            disabled={!edit}
        />
        </div>
        <label>Имя</label>
        <div className={styles.row}><input
            type="text"
            name="firstName"
            onChange={(e) => setUser({...user, firstName: e.currentTarget.value})}
            placeholder={dataUser.firstName}
            disabled={!edit}
        />
        </div>
        <label>Фамилия</label>
        <div className={styles.row}><input
            type="text"
            name="lastName"
            onChange={(e) => setUser({...user, lastName: e.currentTarget.value})}
            placeholder={dataUser.lastName}
            disabled={!edit}
        />
        </div>


        <div className={styles.buttons}>

            <div className={styles.WrapBtn}>
                {!edit && <Button
                    onClick={() => setEdit(true)}
                    className={styles.EditButton}
                    text="Редактировать"
                />}
                {edit && <>
                    <DeleteUser deleteUser={deleteProfile}/>
                    <Button
                        className={styles.EditButton}
                        text="Сохранить"
                        type="submit"
                        onClick={() => submitEdit()}
                    /></>}
            </div>
        </div>


    </div>
}
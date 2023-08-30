import React from 'react'
import {Button} from "../Button";
import s from './SettingsMenu.module.scss'

let settingsList = [
    {
        id: 0,
        title: "Профиль",
        icon: '#profile',
        iconActive: '#profileActive',
    },
    {
        id: 1,
        title: "Пароль",
        icon: '#password',
        iconActive: '#passwordActive',
    },
    {
        id: 2,
        title: "Счета",
        icon: '#account',
        iconActive: '#accountActive',
    },
    {
        id: 3,
        title: "Категории",
        icon: '#category',
        iconActive: '#categoryActive',
    },
]

export const SettingsMenu = ({active, setActive}) => {
    return <div className={s.rowMenu}>
        {settingsList.map(t => <Button onClick={() => setActive(t.id)} key={t.id}
                                       className={active === t.id ? s.buttonActive : s.button}>
            <svg>
                <use href={active === t.id ? t.iconActive : t.icon}/>
            </svg>
            <span> {t.title}</span>
        </Button>)}
    < /div>
}
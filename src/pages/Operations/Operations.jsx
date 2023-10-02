import React, {useState} from "react";
import {Container, Expenses} from "../../components";
import {Incomes} from "../../components/Incomes";
import {Movings} from "../../components/Movings";

export const Operations = () => {
    const operations = [
        {
            title: 'Расходы',
            id: 0
        },
        {
            title: 'Доходы',
            id: 1
        },
        {
            title: 'Перемещения',
            id: 2
        },
    ]
    const [active, setActive] = useState(0)
    return <Container>
        {active == 0 ? <Expenses setActive={setActive} operations={operations} active={active}/> : active == 1 ?
            <Incomes setActive={setActive} operations={operations} active={active}/> : active == 2 ? <Movings setActive={setActive} operations={operations} active={active} /> : <></> }

    </Container>

};

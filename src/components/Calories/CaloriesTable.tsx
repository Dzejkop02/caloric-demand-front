import React from 'react';
import { OneFilteredDay } from 'types';
import {CaloriesRow} from "./CaloriesRow";

import './CaloriesTable.css';

interface Props {
    data: OneFilteredDay[];
    onAddData: (day: number, kcal: number | '', weight: number | '') => void;
}

export const CaloriesTable = (props: Props) => (
    <table>
        <tbody>
            <CaloriesRow
                week={1}
                data={props.data}
                onAddData={props.onAddData}
            />
            <CaloriesRow
                week={2}
                data={props.data}
                onAddData={props.onAddData}
            />
        </tbody>
    </table>
);
import React from 'react';
import { getDataResponse } from 'types';
import {CaloriesRow} from "./CaloriesRow";

interface Props {
    data: getDataResponse;
}

export const CaloriesTable = (props: Props) => (
    <table>
        <tbody>
            <CaloriesRow
                week={1}
                data={props.data}
            />
            <CaloriesRow
                week={2}
                data={props.data}
            />
        </tbody>
    </table>
);
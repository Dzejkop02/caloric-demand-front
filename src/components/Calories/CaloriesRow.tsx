import React from 'react';
import { getDataResponse } from 'types';
import {CaloriesField} from "./CaloriesField";

interface Props {
    week: number;
    data: getDataResponse;
}

export const CaloriesRow = (props: Props) => {
    const rowData = props.week === 1 ? props.data.filter(day => day.day < 8) : props.data.filter(day => day.day >= 8);

    return <tr>
        <th>Week {props.week}</th>
        {rowData.map(day => (
            <CaloriesField
                key={day.day}
                day={day.day}
                kcal={day.kcal}
                weight={day.weight}
                hasInfo={day.hasInfo}
            />
            )
        )}
    </tr>;
};
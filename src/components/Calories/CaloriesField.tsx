import React from 'react';

interface Props {
    day: number;
    kcal: number | '';
    weight: number | '';
    hasInfo: boolean;
    onAddData: (day: number, kcal: number | '', weight: number | '') => void;
}

export const CaloriesField = (props: Props) => {
    if (props.hasInfo) {
        return <td onClick={() => props.onAddData(props.day, props.kcal, props.weight)}>
            <h4>{props.day}</h4>
            <p>{props.kcal} kcal</p>
            <p>{props.weight} kg</p>
        </td>;
    } else {
        return <td onClick={() => props.onAddData(props.day, '', '')}>
            <h4>{props.day}</h4>
        </td>
    }
};
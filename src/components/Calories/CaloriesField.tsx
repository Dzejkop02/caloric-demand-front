import React from 'react';

interface Props {
    day: number;
    kcal?: number | null;
    weight?: number | null;
    hasInfo: boolean;
}

export const CaloriesField = (props: Props) => {
    if (props.hasInfo) {
        return <td>
            <h4>{props.day}</h4>
            <p>{props.kcal} kcal</p>
            <p>{props.weight} kg</p>
        </td>;
    } else {
        return <td>
            <h4>{props.day}</h4>
        </td>
    }
};
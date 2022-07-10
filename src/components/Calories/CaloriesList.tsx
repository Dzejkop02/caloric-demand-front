import React, {useEffect, useState} from 'react';
import {getDataResponse} from 'types';
import {CaloriesTable} from "./CaloriesTable";

import './CaloriesList.css';
import {caloriesCalculator} from "../../utils/calories-calculator";

export const CaloriesList = () => {
    const [data, setData] = useState<getDataResponse | null>(null);
    const [result, setResult] = useState<number | null>(null);

    const refreshData = async () => {
        const res = await fetch('http://localhost:3001/data/');
        const d = await res.json();

        setData(d);

        if (d.length === 14) {
            setResult(caloriesCalculator(d))
        } else {
            setResult(null);
        }
    }

    useEffect(() => {
        refreshData();
    }, []);

    if (data === null) {
        return null;
    }

    return <>
        <h1>Accurate Caloric Demand Calculator</h1>
        <CaloriesTable
            data={data}
        />
    </>;
};
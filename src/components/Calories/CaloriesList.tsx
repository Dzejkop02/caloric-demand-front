import React, {useEffect, useState} from 'react';
import {getDataResponse} from 'types';
import {CaloriesTable} from "./CaloriesTable";
import {caloriesCalculator} from "../../utils/calories-calculator";
import {CaloriesResult} from "../CaloriesResult/CaloriesResult";

import './CaloriesList.css';

export const CaloriesList = () => {
    const [data, setData] = useState<getDataResponse | null>(null);
    const [result, setResult] = useState<number | null>(null);

    const refreshData = async () => {
        const res = await fetch('http://localhost:3001/data/');
        const d = await res.json() as getDataResponse;

        setData(d);

        if (d.every(item => item.hasInfo)) {
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
        <CaloriesResult
            result={result}
        />
    </>;
};
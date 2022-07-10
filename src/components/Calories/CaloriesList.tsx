import React, {useEffect, useState} from 'react';
import {getDataResponse} from 'types';
import {CaloriesTable} from "./CaloriesTable";

import './CaloriesList.css';

export const CaloriesList = () => {
    const [data, setData] = useState<getDataResponse | null>(null);

    const getData = async () => {
        const res = await fetch('http://localhost:3001/data/');
        setData(await res.json());
    }

    useEffect(() => {
        getData();
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
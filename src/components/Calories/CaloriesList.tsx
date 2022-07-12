import React, {useEffect, useState} from 'react';
import {getDataResponse} from 'types';
import {CaloriesTable} from "./CaloriesTable";
import {caloriesCalculator} from "../../utils/calories-calculator";
import {CaloriesResult} from "../CaloriesResult/CaloriesResult";

import './CaloriesList.css';
import {ClearDataBtn} from "../ClearDataBtn/ClearDataBtn";
import {UpdateDataPopup} from "../UpdateDataPopup/UpdateDataPopup";

export const CaloriesList = () => {
    const [data, setData] = useState<getDataResponse | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [overlayClass, setOverlayClass] = useState<'hidden' | ''>('hidden');

    // data for popup
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [kcal, setKcal] = useState<number | ''>('');
    const [weight, setWeight] = useState<number | ''>('');

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

    const showAddDataPopup = (day: number, kcal: number | '', weight: number | '') => {
        setSelectedDay(day);
        setKcal(kcal);
        setWeight(weight);
        setOverlayClass('');
    };

    const hideAddDataPopup = async () => {
        await refreshData();
        setOverlayClass('hidden');
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
            onAddData={showAddDataPopup}
        />
        <CaloriesResult
            result={result}
        />
        <ClearDataBtn
            onClearData={refreshData}
        />
        {
            !overlayClass &&
            <UpdateDataPopup
                day={selectedDay}
                kcal={String(kcal)}
                weight={String(weight)}
                onUpdateData={hideAddDataPopup}
            />
        }
        <div className={`overlay ${overlayClass}`} onClick={hideAddDataPopup}></div>
    </>;
};
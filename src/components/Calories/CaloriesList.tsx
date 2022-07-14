import React, {useEffect, useState} from 'react';
import {getDataResponse} from 'types';
import {CaloriesTable} from "./CaloriesTable";
import {caloriesCalculator} from "../../utils/calories-calculator";
import {CaloriesResult} from "../CaloriesResult/CaloriesResult";

import './CaloriesList.css';
import {ClearDataBtn} from "../ClearDataBtn/ClearDataBtn";
import {UpdateDataPopup} from "../UpdateDataPopup/UpdateDataPopup";

interface Props {
    onSendStatus: (code: number) => void;
}

export const CaloriesList = (props: Props) => {
    const [data, setData] = useState<getDataResponse | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [overlayClass, setOverlayClass] = useState<'hidden' | ''>('hidden');

    // data for popup
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [kcal, setKcal] = useState<number | ''>('');
    const [weight, setWeight] = useState<number | ''>('');

    const refreshData = async (responseData?: getDataResponse) => {
        let d;

        if (responseData) {
            d = responseData;
        } else {
            const res = await fetch('http://localhost:3001/data/');
            props.onSendStatus(res.status);
            d = await res.json() as getDataResponse;
        }

        setData(d);

        if (d.ok && d.data.every(item => item.hasInfo)) {
            setResult(caloriesCalculator(d.data))
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

    const hideAddDataPopup = async (responseData?: getDataResponse) => {
        await refreshData(responseData);
        setOverlayClass('hidden');
    }

    useEffect(() => {
        refreshData();
    }, []);

    if (data === null) {
        return null;
    }

    if (!data.ok) {
        return <p>Error getting data.</p>;
    }

    return <>
        <h1>Accurate Caloric Demand Calculator</h1>
        <CaloriesTable
            data={data.data}
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
        <div className={`overlay ${overlayClass}`} onClick={() => hideAddDataPopup()}></div>
    </>;
};
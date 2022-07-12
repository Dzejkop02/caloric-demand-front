import React from "react";
import { getDataResponse } from "types";

import './ClearDataBtn.css';

interface Props {
    onClearData: (responseData?: getDataResponse) => void;
}

export const ClearDataBtn = (props: Props) => {
    const clearData = async () => {
        const res = await fetch('http://localhost:3001/data/', {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }

        const data = await res.json();

        props.onClearData(data);
    };

    return <div className="ClearDataBtn">
        <button onClick={clearData}>Clear data</button>
    </div>;
}
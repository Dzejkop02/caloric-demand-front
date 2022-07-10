import React from 'react';

import './CaloriesResult.css';

interface Props {
    result: number | null;
}

export const CaloriesResult = (props: Props) => {
    if (!props.result) {
        return <div className="CaloriesResult red">
            Enter data in all days to see your result.
        </div>;
    }

    return <div className="CaloriesResult">
        Your calories demand is: <b>{props.result}</b>.
    </div>;
};
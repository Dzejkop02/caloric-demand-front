import React, {useState, FormEvent} from 'react';

import './UpdateDataPopup.css';

interface Props {
    day: number;
    kcal: string;
    weight: string;
    onUpdateData: () => void;
}

export const UpdateDataPopup = (props: Props) => {
    const [kcal, setKcal] = useState<string>(props.kcal);
    const [weight, setWeight] = useState<string>(props.weight);

    const setData = async (e: FormEvent) => {
        e.preventDefault();

        await fetch('http://localhost:3001/data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                day: props.day,
                kcal: Number(kcal),
                weight: Number(weight),
            }),
        });

        props.onUpdateData();
    };

    const deleteDay = async () => {
        await fetch(`http://localhost:3001/data/${props.day}`, {
            method: 'DELETE',
        });

        props.onUpdateData();
    }

    return <div className="UpdateDataPopup">
        <form onSubmit={setData}>
            <h3>Set data for day {props.day}</h3>

            <label htmlFor="kcal">Eaten calories: (0-50000)</label>
            <input
                id="kcal"
                type="number"
                value={kcal}
                onChange={e => setKcal(e.target.value)}
            />

            <label htmlFor="weight">Your weight: (20-300)</label>
            <input
                id="weight"
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />

            <div className="buttons">
                <button type="button" className="btn delete-btn" onClick={deleteDay}>Delete day {props.day}</button>
                <button type="submit" className="btn">Save</button>
            </div>
        </form>
    </div>
};

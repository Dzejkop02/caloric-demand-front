import { OneFilteredDay } from "types";

export const caloriesCalculator = (data: OneFilteredDay[]): number => {
    const weightWeek1 = data.filter(day => day.day < 8).map(day => day.weight).reduce((a, b) => (a as number) + (b as number), 0) as number / 7;
    const weightWeek2 = data.filter(day => day.day >= 8).map(day => day.weight).reduce((a, b) => (a as number) + (b as number), 0) as number / 7;
    const difference = weightWeek1 - weightWeek2;

    const eatenCaloriesPerDay = data.map(day => day.kcal).reduce((a, b) => (a as number) + (b as number), 0) as number / 14;
    const caloriesChange = (difference * 3500) / 0.5 / 7;

    return +(eatenCaloriesPerDay + caloriesChange).toFixed();
};
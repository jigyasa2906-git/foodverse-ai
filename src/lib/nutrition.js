export const ACTIVITY_FACTOR = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
};
/** Mifflin–St Jeor BMR (kcal/day). */
export function bmr(sex, weightKg, heightCm, age) {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161));
}
export function tdee(b, a) {
    return Math.round(b * ACTIVITY_FACTOR[a]);
}
export function targetCalories(t, goal) {
    const v = goal === "lose" ? t - 500 : goal === "gain" ? t + 300 : t;
    return Math.max(1200, Math.round(v));
}
export function bmi(weightKg, heightCm) {
    const m = heightCm / 100;
    return Math.round((weightKg / (m * m)) * 10) / 10;
}
/** Macro split in grams: protein 1.6–2.0 g/kg, fat 25%, rest carbs. */
export function macros(kcal, weightKg, goal) {
    const protein = Math.round(weightKg * (goal === "maintain" ? 1.6 : 2.0));
    const fat = Math.round((kcal * 0.25) / 9);
    const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4));
    return { protein, fat, carbs };
}

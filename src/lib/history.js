// Analysis history kept only on this device (localStorage) to protect user data.
import { useEffect, useState } from "react";
const KEY = "foodverse.history.v1";
const PROFILE_KEY = "foodverse.profile.v1";
export function readHistory() {
    if (typeof window === "undefined")
        return [];
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    }
    catch {
        return [];
    }
}
export function addHistory(e) {
    const all = [{ ...e, id: crypto.randomUUID(), at: Date.now() }, ...readHistory()].slice(0, 200);
    localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("foodverse-history"));
}
export function clearHistory() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(PROFILE_KEY);
    window.dispatchEvent(new Event("foodverse-history"));
}
export function useHistory() {
    const [h, setH] = useState([]);
    useEffect(() => {
        const f = () => setH(readHistory());
        f();
        window.addEventListener("foodverse-history", f);
        return () => window.removeEventListener("foodverse-history", f);
    }, []);
    return h;
}
export function saveProfile(p) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}
export function loadProfile() {
    try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
    }
    catch {
        return null;
    }
}

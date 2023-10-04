import { createContext, useContext } from "react";

export const TabContext = createContext();
export default function useTab() {
    return useContext(TabContext);
}
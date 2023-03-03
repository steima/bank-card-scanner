import * as React from "react";
import {PropsWithChildren, createContext, useContext, useMemo, useState, useCallback, useEffect} from "react";
import {BankData} from "../libs/apiLayerBankDataAdapter";

interface BankDataHistoryContextData {
    history: BankData[];
    addBankData: (bankData: BankData) => void;
    clearHistory: () => void;
}

const emptyContext: BankDataHistoryContextData = {
    history: [],
    addBankData: (bankData: BankData) => {},
    clearHistory: () => {}
};

export const BankDataHistoryContext = createContext<BankDataHistoryContextData>(emptyContext);

export function BankDataHistoryContextProvider({children}: PropsWithChildren<any>) {
    const [history, setHistory] = useState<BankData[]>([]);

    const addBankData = useCallback((bankData: BankData) => {
        setHistory([...history, bankData]);
        localStorage.setItem('bankDataHistory', JSON.stringify([...history, bankData]));
    }, [history]);

    const clearHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem('bankDataHistory');
    }, []);

    useEffect(() => {
        const bankDataHistory = localStorage.getItem('bankDataHistory');
        if(bankDataHistory) {
            setHistory(JSON.parse(bankDataHistory));
        }
    }, []);

    const currentContext = useMemo<BankDataHistoryContextData>(() => ({
        history, addBankData, clearHistory
    }), [history, addBankData, clearHistory]);

    return (
        <BankDataHistoryContext.Provider value={currentContext}>
            {children}
        </BankDataHistoryContext.Provider>
    );
}

export function useBankDataHistoryContext() {
    return useContext(BankDataHistoryContext);
}
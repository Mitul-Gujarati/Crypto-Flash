import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react';
import { CoinList } from './config/api';
import { auth, db } from './firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success"
    })
    const [watchlist, setWatchlist] = useState([])

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        if(user) {
            const coinRef = doc(db, "watchlist", user.uid);

            const unsubscribe = onSnapshot(coinRef, coin => {
                if(coin.exists()) {
                    setWatchlist(coin.data().coins)
                }
                else{
                    console.log("No Items in Watchlists");
                }
            })

            return () => {
                unsubscribe()
            }
        }
    }, [user])

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user)
            else setUser(null)
        })
    })

    useEffect(() => {
        if (currency === "INR")
            setSymbol("₹")
        else if (currency === "USD")
            setSymbol("$")
    },[currency])

    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist}}>
            {children}
        </Crypto.Provider>
    )
}

export const CryptoState = () => {
    return useContext(Crypto);
}

export default CryptoContext

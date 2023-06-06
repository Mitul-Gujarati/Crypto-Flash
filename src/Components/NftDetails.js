import { LinearProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IndexsList } from '../config/api'
import { CryptoState } from '../CryptoContext'

const NftDetails = () => {

    const [nftData, setNftData] = useState()
    const { loading } = CryptoState()
    const { id, contract } = useParams()

    const fetchNftDetails = useCallback(
        async () => {
        const { data } = await axios.get(IndexsList(id, contract))
        console.log(data);
        setNftData(data);
    }, [id, contract])

    useEffect(() => {
        fetchNftDetails();
    }, [fetchNftDetails])

    console.log(nftData);

    return (
        <div style={{
            backgroundImage: "url('/mv_bg.jpg')",
            backgroundRepeat: "no-repeat",
            height: "100vh"
        }}>
            {loading ? <LinearProgress color='gold' /> :
                <div style={{ alignItems: "center", justifyContent: "center" }}>

                    <div>
                        <img
                            src={nftData?.image?.small}
                            alt={nftData?.name}
                            height="200"
                            style={{display: "block", margin: "auto", paddingTop: 5}}
                        />
                    </div>

                    <h2 style={{ textDecoration: "underline", textAlign:"center "}}>Details</h2>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        padding: "10px",
                        textAlign: "center "
                    }}>

                        <span>
                            <span style={{ color: "yellow" }}>Name: </span>{nftData?.name}
                        </span>
                        <span>
                            <span style={{ color: "yellow" }}>Id: </span>{nftData?.asset_platform_id}
                        </span>
                        <span>
                            <span style={{ color: "yellow" }}>Description: </span>{nftData?.description}
                        </span>
                        <span>
                            <span style={{ color: "yellow" }}>Price: </span>${nftData?.floor_price.usd}
                        </span>
                        <span>
                            <span style={{ color: "yellow" }}>MarketCap: </span>${nftData?.market_cap.usd}
                        </span>
                        <span>
                            <span style={{ color: "yellow" }}>Total Supply: </span>{nftData?.total_supply}
                        </span>
                        <span>
                            <span style={{ color: "yellow" }}>24hr Change: </span>
                            <span style={{color: nftData?.floor_price_in_usd_24h_percentage_change > 0 ? "#00FF00" : "#cc0000"}} >
                                {nftData?.floor_price_in_usd_24h_percentage_change}
                            </span>
                        </span>

                    </div>

                    <h2 style={{textDecoration: "underline", textAlign:"center"}}>Links</h2>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 15,
                        padding: "10px",
                        textAlign: "center"
                    }}>

                        <Link to={nftData?.links?.homepage} style={{ textDecoration: "none", color: "yellowgreen" }}>Go Nft Page</Link>
                        <Link to={nftData?.links?.twitter} style={{ textDecoration: "none", color: "yellowgreen" }}>Go To Twitter Page</Link>
                        <Link to={nftData?.links?.discord} style={{ textDecoration: "none", color: "yellowgreen" }}>Go To Discord Page</Link>

                    </div>

                </div>
            }
        </div>
    )
}

export default NftDetails

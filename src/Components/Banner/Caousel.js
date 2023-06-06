import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'

const useStyles = makeStyles(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center"
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        textDecorationLine: "none"
    }
}))

//this function use to give "," between crypto price.like 1941451 => 1,941,451 this way.
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Caousel Component
const Caousel = () => {

    const [trending, setTrending] = useState([]);

    //taking currency and symbol from context.
    const { currency, symbol } = CryptoState();

    const classes = useStyles();

    //asynchronous function for facing the data from api.
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    console.log(trending);

    //When ever currency is updates the data is coming from api, also when the first render will happen data is coming because of useEffect hook.
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])

    //All creypto coins coming from api is stored into items.
    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h > 0

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`} >
                <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
                <span >{coin?.symbol} &nbsp;
                    <span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }} >
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    //if pixel size is 0 than zero than 2 items and if grater than 512 than 4 items will display.
    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Caousel

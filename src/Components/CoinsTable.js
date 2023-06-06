import { Pagination } from '@material-ui/lab'
import { createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { makeStyles, ThemeProvider } from '@mui/styles'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { numberWithCommas } from './Banner/Caousel'


const useStyles = makeStyles(() => (
    {
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat"
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold"
            }
        },
        textField: {
            "& .MuiInputBase-inputTypeSearch": {
                color: "white"
            }
        }
    }
))

const CoinsTable = () => {

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)


    const { currency, symbol, coins, loading, fetchCoins } = CryptoState()

    const navigate = useNavigate()

    const Classes = useStyles()

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    console.log(coins);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleSearch = () => {
        if(search.toString().length === 0){
            return coins;
        }
        else{
            return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4'
                    style={{
                        margin: 18,
                        fontFamily: "Montserrat"
                    }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label="Search For a Crypto Currency.."
                    type="search"
                    variant='outlined'
                    color='secondary'
                    focused
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    className={Classes.textField}
                />
                <TableContainer>
                    { //if there is a loading than show only LinearProgress otherwise table of content.
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table aria-label = "simple table">
                                
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat"
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                    <TableBody>
                                        {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    className={Classes.row}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        style={{ display: "flex", gap: 15 }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "column"
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                    color: "white"
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgray" }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {symbol} {" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {profit && "+"} {row?.price_change_percentage_24h?.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: "white",
                                                            fontWeight: 500
                                                        }}>
                                                        {symbol} {" "}
                                                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>

                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    color="primary"
                    style={
                        {
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }
                    }
                    classes={{ ul: Classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable

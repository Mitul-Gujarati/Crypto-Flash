import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NFTListById } from '../config/api';
import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { CryptoState } from '../CryptoContext';

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

const NftInfo = () => {

    const [nftList, setNftList] = useState([]);

    const {id} = useParams();

    const fetchNftById = async () => {
        const {data} = await axios.get(NFTListById(id))
        setNftList(data)
    }

    const {loading} = CryptoState()

    useEffect(() => {
        fetchNftById()
    },[id])

    console.log(nftList);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const Classes = useStyles()

    const navigate = useNavigate()



    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center", marginTop: 10 }}>
                <TableContainer>
                    { //if there is a loading than show only LinearProgress otherwise table of content.
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>
                                
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Name", "Assert", "ID", "Symbol"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat"
                                                }}
                                                key={head}
                                                align={head === "Name" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                    <TableBody>
                                        {nftList.filter(row => row.contract_address != null).map((row) => {
                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/nfts/${row.asset_platform_id}/${row.contract_address}`)}
                                                    className={Classes.row}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        style={{ display: "flex", gap: 15 }}
                                                    >
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
                                                            </span>
                                                            <span style={{ color: "darkgray" }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: "white",
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {row.asset_platform_id}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            fontWeight: 500,
                                                            color: "white"
                                                        }}
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: "white",
                                                            fontWeight: 500
                                                        }}>
                                                            {row.symbol}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
            </Container>
        </ThemeProvider>
    )

}

export default NftInfo

import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NFTList } from '../config/api'
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

const Nft = () => {

    const Nft = "nft";

    const [nft, setNft] = useState([]);

    const { loading } = CryptoState()

    //asynchronous function for facing the data from api.
    const fetchNftList = async () => {
        const { data } = await axios.get(NFTList(Nft))
        setNft(data)
    }

    useEffect(() => {
        fetchNftList()
    }, [])

    console.log(nft);

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
                                        {["Name", "Identifier", "Nft_Id", "Short_Name"].map((head) => (
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
                                        {nft.map((row) => {
                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/nfts/${row.id}`)}
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
                                                        {row.chain_identifier}
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
                                                            {row.shortname}
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

export default Nft

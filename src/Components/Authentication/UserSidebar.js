import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Drawer } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { AiFillDelete } from "react-icons/ai";
import { numberWithCommas } from "../Banner/Caousel"
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace"
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%"
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll"
    },
    coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black",
    }
});



export default function UserSidebar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false
    });

    const navigate = useNavigate()

    const { user, setAlert, coins, watchlist, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth )

        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull!"
        })

        toggleDrawer()

        navigate("/")

    }

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, 'watchlist', user.uid);
    
        try {
          await setDoc(coinRef, {
            coins: watchlist.filter((watch) => watch !== coin?.id)
          },
          {merge: "true"}
          )
    
          setAlert({
            open: true,
            message: `${coin.name} Removed From Watchlist !`,
            type: "success",
          })
        } catch (error) {
          setAlert({
            open: true,
            message: error.message,
            type: "error",
          })
        }
      }

      const rediectToCoin = () => {
        console.log("click");
      }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D"
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        cursor: "pointer",
                                        backgroundColor: "#EEBC1D",
                                        objectFit: "contain"
                                    }}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word"
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                                    
                                        {coins.map((coin) => {
                                            if (watchlist.includes(coin.id))
                                                return (
                                                    <div className={classes.coin} onClick={rediectToCoin}>
                                                        <span>{coin.name}</span>
                                                        <span style={{ display: "flex", gap: 8 }}>
                                                            {symbol}{" "}
                                                            {numberWithCommas(coin.current_price.toFixed(2))}
                                                            <AiFillDelete
                                                                style={{ cursor: "pointer" }}
                                                                fontSize="16"
                                                                onClick={() => removeFromWatchlist(coin)}
                                                            />
                                                        </span>
                                                    </div>
                                                );
                                            else return <></>;
                                        })}
                                    
                </div>
                            </div>
                        </div>
                        <Button variant='contained' onClick={logOut} style={{
                            height: "8%",
                            width: "100%",
                            backgroundColor: "#EEBC1D",
                            marginTop: 20
                        }}>
                            Log Out
                        </Button>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}


import { AppBar, Button, Container, createTheme, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ThemeProvider } from '@mui/material/styles';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
}))

//this logic for giving message for hover on button.
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Header = () => {

  const classes = useStyles();

  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleNft = () => {
    if (user) navigate("/nfts") 
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='sticky' style={{backgroundColor: "black"}}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant='h6'>
              Crypto Flash
            </Typography>

            {/* From here to user can select the currency in which he wants to see the price of each coin. */}
            <Select
              variant='outlined'
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={"USD"} >USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {/* If user is Logged in than user can access the NFT feature otherwise user get "Please Login!!" message when he hover on NFT button. */}
            {
              user ? <Button
                variant='contained'
                style=
                {{
                  width: 85,
                  height: 40,
                  backgroundColor: "#EEBC1D",
                  marginRight: 15,
                  cursor: user ? "pointer" : "not-allowed"
                }}
                onClick={handleNft}>NFT</Button> :
                <BootstrapTooltip title="Please Login!!">
                  <Button
                    variant='contained'
                    style=
                    {{
                      width: 85,
                      height: 40,
                      backgroundColor: "#EEBC1D",
                      marginRight: 15,
                      cursor: user ? "pointer" : "not-allowed"
                    }}
                    onClick={handleNft}>NFT</Button>
                </BootstrapTooltip>
             }

             {/* If user is logged in than user can see his profile photo or his name symbol, if not than user can see Login button. */}
            { user ? <UserSidebar /> : <AuthModal />} 
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header

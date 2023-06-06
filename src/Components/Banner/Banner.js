import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Caousel from './Caousel'


const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./3412756.jpg)"
    },
    bannercontent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
}))

const Banner = () => {

    const classes = useStyles()
    

  return (
    <div className={classes.banner}>
      <Container className={classes.bannercontent}>
        <div className={classes.tagline}>
            <Typography variant='h2' style={{fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat"}}>
                Crypto Flash
            </Typography>
            <Typography variant='subtitle2' style={{color: "darkgray", textTransform: "capitalize", fontFamily: "Montserrat"}}>
                Get all the Info regarding your favorite Crypto Currency
            </Typography>
        </div>
        <Caousel />
      </Container>
    </div>
  )
}

export default Banner

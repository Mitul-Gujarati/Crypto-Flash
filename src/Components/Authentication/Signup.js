import { Box, Button, TextField } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import {auth} from '../../firebase'

const Signup = ({handleClose}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { setAlert } = CryptoState()

    const handleSubmit = async() => {
        if(password !== confirmPassword){
            setAlert({
                open: true,
                message: "Passwords are different",
                type: "error"
            })
            return
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log(result);

            setAlert({
                open: true,
                message: `Sign Up Sucessful. Welcome ${result.user.email}`,
                type: "success"
            })

            handleClose()
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error"
            })
            return
        }
    }

  return (
      <Box p={3} display="flex" flexDirection="column" gap="20px">
          <TextField
              variant='outlined'
              type="email"
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
          />

          <TextField
              variant='outlined'
              type="password"
              label="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
          />

          <TextField
              variant='outlined'
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
          />

          <Button variant='contained' size='large' style={{backgroundColor: "#EEBC1D"}} onClick={handleSubmit}>
            Sign Up
          </Button>
      </Box>
  )
}

export default Signup

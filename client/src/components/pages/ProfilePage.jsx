import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [role1 , setRole1] = useState(null)
    const [email , setEmail] = useState(null)


    useEffect(() => {
        const role11 = localStorage.getItem("role")
        const email1 = localStorage.getItem("email")
        setRole1(role11)
        setEmail(email1)

    }, [])

    return (
        <div>

            <Typography>Role: {role1}</Typography>
            <Typography>Email :{email}</Typography>
        </div>
    )
}

export default ProfilePage
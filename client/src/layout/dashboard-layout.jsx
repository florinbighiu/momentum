import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"
import Loading from '../components/Loading'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()


    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in")
        }
    }, [isLoaded])

    if (!isLoaded) return <Loading />

    return (
        <>
            <Sidebar />
            <Outlet />
        </>

    )
}
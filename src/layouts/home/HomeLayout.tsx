import { AppSidebar } from "@/components/organisms"
import { Header } from "@/components/organisms/Header"
import { Outlet } from "react-router"

export const HomeLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex flex-1 overflow-hidden w-screen">
                    <AppSidebar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
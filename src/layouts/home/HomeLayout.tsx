import { Header } from "@/components/organisms/Header"
import { Outlet } from "react-router"

export const HomeLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <aside className="w-[290px] bg-gray-800 text-white flex flex-col">
                    </aside>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
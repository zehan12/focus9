"use client"

import type React from "react"

import { Grid, Search, Bell, Clock, User, ChevronRight, LogOut, Settings, UserCircle } from "lucide-react"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router"
import { ROUTES } from "@/constants"
import { useDispatch } from "react-redux"
import { logout } from "@/store/auth/slice"

export const Header = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate(ROUTES.LOGIN);
    }

    return (
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
                <div className="flex items-center">
                    <div className="text-orange-500 mr-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                            <path d="M2 17L12 22L22 17" fill="currentColor" />
                            <path d="M2 12L12 17L22 12" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="font-bold text-xl flex items-center">
                        FOCUS<span className="text-blue-600">9</span>
                    </div>
                </div>
                <div className="border-l border-gray-300 h-6 mx-4"></div>
                <button className="p-1">
                    <Grid size={20} />
                </button>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-8 pr-4 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <button className="p-1 text-gray-600 hover:text-gray-800">
                    <Bell size={20} />
                </button>
                <button className="p-1 text-gray-600 hover:text-gray-800">
                    <Clock size={20} />
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md p-1 transition-colors">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
                                <User size={16} />
                            </div>
                            <span className="text-sm font-medium">Admin</span>
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 text-sm font-medium">User Account</div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <UserCircle className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center">
                    <div className="text-orange-500 mr-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                            <path d="M2 17L12 22L22 17" fill="currentColor" />
                            <path d="M2 12L12 17L22 12" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="font-bold text-xl flex items-center">
                        FOCUS<span className="text-blue-600">9</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

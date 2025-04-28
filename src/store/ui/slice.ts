import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/store"

interface UiState {
    activeTab: "list" | "form"
    infoSidebarOpen: boolean
    calendarOpen: boolean
    vendorSelectorOpen: boolean
    itemSelectorOpen: boolean
    authHistoryOpen: boolean
    currentPage: number
    itemsPerPage: number
    defaultView: boolean
}

const initialState: UiState = {
    activeTab: "list",
    infoSidebarOpen: false,
    calendarOpen: false,
    vendorSelectorOpen: false,
    itemSelectorOpen: false,
    authHistoryOpen: false,
    currentPage: 1,
    itemsPerPage: 10,
    defaultView: false,
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<"list" | "form">) => {
            state.activeTab = action.payload
        },
        toggleInfoSidebar: (state) => {
            state.infoSidebarOpen = !state.infoSidebarOpen
        },
        toggleCalendar: (state) => {
            state.calendarOpen = !state.calendarOpen
        },
        toggleVendorSelector: (state) => {
            state.vendorSelectorOpen = !state.vendorSelectorOpen
        },
        toggleItemSelector: (state) => {
            state.itemSelectorOpen = !state.itemSelectorOpen
        },
        toggleAuthHistory: (state) => {
            state.authHistoryOpen = !state.authHistoryOpen
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload
        },
        toggleDefaultView: (state) => {
            state.defaultView = !state.defaultView
        },
    },
})

export const selectActiveTab = (state: RootState) => state.ui.activeTab
export const selectInfoSidebarOpen = (state: RootState) => state.ui.infoSidebarOpen
export const selectCalendarOpen = (state: RootState) => state.ui.calendarOpen
export const selectVendorSelectorOpen = (state: RootState) => state.ui.vendorSelectorOpen
export const selectItemSelectorOpen = (state: RootState) => state.ui.itemSelectorOpen
export const selectAuthHistoryOpen = (state: RootState) => state.ui.authHistoryOpen
export const selectCurrentPage = (state: RootState) => state.ui.currentPage
export const selectItemsPerPage = (state: RootState) => state.ui.itemsPerPage
export const selectDefaultView = (state: RootState) => state.ui.defaultView

export const {
    setActiveTab,
    toggleInfoSidebar,
    toggleCalendar,
    toggleVendorSelector,
    toggleItemSelector,
    toggleAuthHistory,
    setCurrentPage,
    setItemsPerPage,
    toggleDefaultView,
} = uiSlice.actions

export default uiSlice.reducer

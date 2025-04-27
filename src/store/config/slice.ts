import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/store"

interface Vendor {
    id: string
    code: string
    name: string
    active: boolean
}

interface Item {
    id: string
    code: string
    name: string
    description: string
    defaultUnit: string
    active: boolean
}

interface Unit {
    id: string
    code: string
    name: string
    description: string
}

interface ConfigState {
    vendors: Vendor[]
    items: Item[]
    units: Unit[]
    discountType: "fixed" | "percentage"
    currency: string
    decimalPrecision: number
}

const initialState: ConfigState = {
    vendors: [
        { id: "1", code: "VEND001", name: "Acme Supplies Ltd.", active: true },
        { id: "2", code: "VEND002", name: "Global Parts Inc.", active: true },
        { id: "3", code: "VEND003", name: "Tech Components Co.", active: true },
        { id: "4", code: "VEND004", name: "Industrial Solutions", active: true },
        { id: "5", code: "VEND005", name: "Quality Hardware", active: false },
    ],
    items: [
        {
            id: "1",
            code: "ITEM001",
            name: '7/8" x 1 1/4" SEAL',
            description: "Standard seal for hydraulic systems",
            defaultUnit: "Nos",
            active: true,
        },
        {
            id: "2",
            code: "ITEM002",
            name: "Bearing Assembly",
            description: "Industrial grade bearing assembly",
            defaultUnit: "Nos",
            active: true,
        },
        {
            id: "3",
            code: "ITEM003",
            name: 'Steel Pipe 2"',
            description: "Galvanized steel pipe",
            defaultUnit: "MTR",
            active: true,
        },
        {
            id: "4",
            code: "ITEM004",
            name: "Copper Wire",
            description: "Electrical copper wire",
            defaultUnit: "KG",
            active: true,
        },
        {
            id: "5",
            code: "ITEM005",
            name: "Rubber Gasket",
            description: "High temperature rubber gasket",
            defaultUnit: "Nos",
            active: true,
        },
    ],
    units: [
        { id: "1", code: "NOS", name: "Nos", description: "Numbers" },
        { id: "2", code: "MTR", name: "MTR", description: "Meters" },
        { id: "3", code: "KG", name: "KG", description: "Kilograms" },
        { id: "4", code: "LTR", name: "LTR", description: "Liters" },
        { id: "5", code: "BOX", name: "Box", description: "Box" },
    ],
    discountType: "fixed",
    currency: "INR",
    decimalPrecision: 2,
}

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
    },
})

export const selectVendors = (state: RootState) => state.config.vendors
export const selectActiveVendors = (state: RootState) => state.config.vendors.filter((vendor) => vendor.active)
export const selectItems = (state: RootState) => state.config.items
export const selectActiveItems = (state: RootState) => state.config.items.filter((item) => item.active)
export const selectUnits = (state: RootState) => state.config.units
export const selectDiscountType = (state: RootState) => state.config.discountType
export const selectCurrency = (state: RootState) => state.config.currency
export const selectDecimalPrecision = (state: RootState) => state.config.decimalPrecision

export default configSlice.reducer

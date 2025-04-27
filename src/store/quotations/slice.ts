import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"

// Types
export interface QuotationItem {
    id: number
    item: string
    units: string
    quantity: number
    rate: number
    gross: number
    discount: number
}

export interface Quotation {
    id: string
    documentNo: string
    date: string
    vendorAccount: string
    vendorName?: string
    narration: string
    items: QuotationItem[]
    status: "draft" | "submitted" | "approved" | "rejected" | "closed"
    createdBy: string
    modifiedBy: string
    createdDate: string
    modifiedDate: string
    createdTime: string
    modifiedTime: string
    suspended: boolean
    authorization: string
}

interface QuotationsState {
    list: Quotation[]
    current: Quotation | null
    loading: boolean
    error: string | null
}

const initialState: QuotationsState = {
    list: [
        {
            id: "1",
            documentNo: "PQ-2023-0001",
            date: "19/04/2023",
            vendorAccount: "VEND001",
            vendorName: "Acme Supplies Ltd.",
            narration: "Regular quarterly order",
            items: [
                {
                    id: 1,
                    item: '7/8" x 1 1/4" SEAL',
                    units: "Nos",
                    quantity: 10,
                    rate: 450,
                    gross: 4500,
                    discount: 5,
                },
            ],
            status: "approved",
            createdBy: "SU",
            modifiedBy: "SU",
            createdDate: "19/04/2023",
            modifiedDate: "19/04/2023",
            createdTime: "16:41:23",
            modifiedTime: "16:41:23",
            suspended: false,
            authorization: "Authorized",
        },
    ],
    current: null,
    loading: false,
    error: null,
}

export const generateDocumentNo = () => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    return `PQ-${year}-${randomNum}`
}

export const createEmptyQuotation = (): Quotation => {
    const now = new Date()
    const formattedDate = now.toLocaleDateString("en-GB")
    const formattedTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    return {
        id: Date.now().toString(),
        documentNo: generateDocumentNo(),
        date: formattedDate,
        vendorAccount: "",
        vendorName: "",
        narration: "",
        items: [
            { id: 1, item: "", units: "", quantity: 0, rate: 0, gross: 0, discount: 0 },
            { id: 2, item: "", units: "", quantity: 0, rate: 0, gross: 0, discount: 0 },
            { id: 3, item: "", units: "", quantity: 0, rate: 0, gross: 0, discount: 0 },
            { id: 4, item: "", units: "", quantity: 0, rate: 0, gross: 0, discount: 0 },
            { id: 5, item: "", units: "", quantity: 0, rate: 0, gross: 0, discount: 0 },
        ],
        status: "draft",
        createdBy: "SU",
        modifiedBy: "SU",
        createdDate: formattedDate,
        modifiedDate: formattedDate,
        createdTime: formattedTime,
        modifiedTime: formattedTime,
        suspended: false,
        authorization: "Pending",
    }
}

export const fetchQuotations = createAsyncThunk("quotations/fetchQuotations", async (_, { rejectWithValue }) => {
    try {
        return initialState.list
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return rejectWithValue("Failed to fetch quotations")
    }
})

export const saveQuotation = createAsyncThunk(
    "quotations/saveQuotation",
    async (quotation: Quotation, { rejectWithValue }) => {
        try {

            return quotation
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue("Failed to save quotation")
        }
    },
)

export const deleteQuotation = createAsyncThunk(
    "quotations/deleteQuotation",
    async (id: string, { rejectWithValue }) => {
        try {
            return id
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue("Failed to delete quotation")
        }
    },
)

const quotationsSlice = createSlice({
    name: "quotations",
    initialState,
    reducers: {
        setCurrentQuotation: (state, action: PayloadAction<Quotation | null>) => {
            state.current = action.payload
        },
        createNewQuotation: (state) => {
            state.current = createEmptyQuotation()
        },
        updateCurrentQuotation: (state, action: PayloadAction<Partial<Quotation>>) => {
            if (state.current) {
                state.current = { ...state.current, ...action.payload }
            }
        },
        updateQuotationItem: (state, action: PayloadAction<{ id: number; field: keyof QuotationItem; value: unknown }>) => {
            if (state.current) {
                const { id, field, value } = action.payload
                const updatedItems = state.current.items.map((item) => {
                    if (item.id === id) {
                        const updatedItem = { ...item, [field]: value }

                        if (field === "quantity" || field === "rate") {
                            updatedItem.gross = updatedItem.quantity * updatedItem.rate
                        }

                        return updatedItem
                    }
                    return item
                })

                state.current.items = updatedItems
            }
        },
        addItemRow: (state) => {
            if (state.current) {
                const maxId = Math.max(...state.current.items.map((item) => item.id))
                state.current.items.push({
                    id: maxId + 1,
                    item: "",
                    units: "",
                    quantity: 0,
                    rate: 0,
                    gross: 0,
                    discount: 0,
                })
            }
        },
        removeItemRow: (state, action: PayloadAction<number>) => {
            if (state.current && state.current.items.length > 1) {
                state.current.items = state.current.items.filter((item) => item.id !== action.payload)
            }
        },
        suspendQuotation: (state) => {
            if (state.current) {
                state.current.suspended = true
                state.current.status = "draft"
            }
        },
        submitQuotation: (state) => {
            if (state.current) {
                state.current.status = "submitted"
            }
        },
        approveQuotation: (state) => {
            if (state.current) {
                state.current.status = "approved"
                state.current.authorization = "Authorized"
            }
        },
        rejectQuotation: (state) => {
            if (state.current) {
                state.current.status = "rejected"
                state.current.authorization = "Rejected"
            }
        },
        closeQuotation: (state) => {
            if (state.current) {
                state.current.status = "closed"
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuotations.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchQuotations.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchQuotations.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(saveQuotation.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(saveQuotation.fulfilled, (state, action) => {
                state.loading = false

                // Update if exists, otherwise add
                const index = state.list.findIndex((q) => q.id === action.payload.id)
                if (index !== -1) {
                    state.list[index] = action.payload
                } else {
                    state.list.push(action.payload)
                }

                // Update current
                state.current = action.payload
            })
            .addCase(saveQuotation.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(deleteQuotation.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteQuotation.fulfilled, (state, action) => {
                state.loading = false
                state.list = state.list.filter((q) => q.id !== action.payload)
                if (state.current && state.current.id === action.payload) {
                    state.current = null
                }
            })
            .addCase(deleteQuotation.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const selectQuotations = (state: RootState) => state.quotations.list
export const selectCurrentQuotation = (state: RootState) => state.quotations.current
export const selectQuotationsLoading = (state: RootState) => state.quotations.loading
export const selectQuotationsError = (state: RootState) => state.quotations.error

export const selectNetTotal = (state: RootState) => {
    const current = state.quotations.current
    if (!current) return 0

    return current.items.reduce((total, item) => {
        return total + (item.gross - item.discount)
    }, 0)
}

export const {
    setCurrentQuotation,
    createNewQuotation,
    updateCurrentQuotation,
    updateQuotationItem,
    addItemRow,
    removeItemRow,
    suspendQuotation,
    submitQuotation,
    approveQuotation,
    rejectQuotation,
    closeQuotation,
} = quotationsSlice.actions

export default quotationsSlice.reducer

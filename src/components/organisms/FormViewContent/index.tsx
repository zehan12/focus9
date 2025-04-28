/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { useState } from "react"
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    ChevronRight,
    FileText,
    History,
    Plus,
    Printer,
    Save,
    Settings,
    Trash,
    X,
    PauseCircle,
    Info,
} from "lucide-react"
import {
    selectCurrentQuotation,
    selectNetTotal,
    updateCurrentQuotation,
    updateQuotationItem,
    addItemRow,
    removeItemRow,
    saveQuotation,
    suspendQuotation,
    // submitQuotation,
    createNewQuotation,
} from "@/store/quotations/slice"
import { selectActiveVendors, selectUnits, selectActiveItems, selectCurrency } from "@/store/config/slice"
import { setActiveTab, toggleAuthHistory, toggleInfoSidebar } from "@/store/ui/slice"
import { useAppDispatch, useAppSelector } from "@/hooks"

export const FormViewContent: React.FC = () => {
    const dispatch = useAppDispatch()
    const quotation = useAppSelector(selectCurrentQuotation)
    const netTotal = useAppSelector(selectNetTotal)
    const vendors = useAppSelector(selectActiveVendors) as any
    const units = useAppSelector(selectUnits) as any;
    const items = useAppSelector(selectActiveItems)
    const currency = useAppSelector(selectCurrency) as any

    const [calendarVisible, setCalendarVisible] = useState(false)
    const [vendorSelectorVisible, setVendorSelectorVisible] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
    const [itemSelectorVisible, setItemSelectorVisible] = useState(false)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

    const handleFieldChange = (field: string, value: any) => {
        dispatch(updateCurrentQuotation({ [field]: value }))

        if (validationErrors[field] && value) {
            const newErrors = { ...validationErrors }
            delete newErrors[field]
            setValidationErrors(newErrors)
        }
    }

    const handleItemChange = (id: number, field: string, value: any) => {
        dispatch(updateQuotationItem({ id, field: field as any, value }))
    }

    const handleAddRow = () => {
        dispatch(addItemRow())
    }

    const handleRemoveRow = (id: number) => {
        dispatch(removeItemRow(id))
    }

    const handleSave = () => {
        const errors: Record<string, string> = {}

        if (!quotation?.documentNo) {
            errors.documentNo = "Document No. is required"
        }

        if (!quotation?.vendorAccount) {
            errors.vendorAccount = "Vendor Account is required"
        }

        const hasValidItems = quotation?.items.some((item) => item.item && item.quantity > 0 && item.rate > 0)

        if (!hasValidItems) {
            errors.items = "At least one item with quantity and rate is required"
        }

        const currentDate = new Date()
        const quotationDate = new Date(quotation?.date.split("/").reverse().join("-") || "")

        if (quotationDate > currentDate) {
            errors.date = "Date should not be in the future"
        }

        const hasExcessiveDiscount = quotation?.items.some((item) => item.discount > item.gross)

        if (hasExcessiveDiscount) {
            errors.discount = "Discount should not exceed Gross"
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        if (quotation) {
            dispatch(saveQuotation(quotation))
            dispatch(setActiveTab("list"))
        }
    }

    const handleSuspend = () => {
        dispatch(suspendQuotation())
        dispatch(saveQuotation(quotation!))
        dispatch(setActiveTab("list"))
    }

    // const handleSubmit = () => {
    //     dispatch(submitQuotation())
    //     dispatch(saveQuotation(quotation!))
    // }

    const handleNew = () => {
        dispatch(createNewQuotation())
    }

    const handleClose = () => {
        dispatch(setActiveTab("list"))
    }

    const handleToggleCalendar = () => {
        setCalendarVisible(!calendarVisible)
    }

    const handleToggleVendorSelector = () => {
        setVendorSelectorVisible(!vendorSelectorVisible)
    }

    const handleToggleItemSelector = (itemId: number) => {
        setSelectedItemId(itemId)
        setItemSelectorVisible(!itemSelectorVisible)
    }

    const handleSelectVendor = (vendor: any) => {
        dispatch(
            updateCurrentQuotation({
                vendorAccount: vendor.code,
                vendorName: vendor.name,
            }),
        )
        setVendorSelectorVisible(false)

        if (validationErrors.vendorAccount) {
            const newErrors = { ...validationErrors }
            delete newErrors.vendorAccount
            setValidationErrors(newErrors)
        }
    }

    const handleSelectItem = (item: any) => {
        if (selectedItemId !== null) {
            const selectedItem = quotation?.items.find((i) => i.id === selectedItemId)
            if (selectedItem) {
                dispatch(
                    updateQuotationItem({
                        id: selectedItemId,
                        field: "item",
                        value: item.name,
                    }),
                )
                dispatch(
                    updateQuotationItem({
                        id: selectedItemId,
                        field: "units",
                        value: item.defaultUnit,
                    }),
                )
            }
        }
        setItemSelectorVisible(false)
    }

    const handleSelectDate = (date: string) => {
        dispatch(updateCurrentQuotation({ date }))
        setCalendarVisible(false)

        if (validationErrors.date) {
            const newErrors = { ...validationErrors }
            delete newErrors.date
            setValidationErrors(newErrors)
        }
    }

    const handleToggleInfoSidebar = () => {
        dispatch(toggleInfoSidebar())
    }

    const handleToggleAuthHistory = () => {
        dispatch(toggleAuthHistory())
    }

    if (!quotation) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-gray-500">No quotation selected</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 bg-white border-b">
                <h2 className="text-lg font-medium">Purchases Quotations-Standard</h2>
            </div>

            <div className="flex justify-between px-4 py-2 bg-gray-100 border-b">
                <div className="flex space-x-2">
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        onClick={handleNew}
                        title="New Quotation"
                    >
                        <FileText size={16} className="mr-1" />
                        <span>New</span>
                    </button>
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        onClick={handleSave}
                        title="Save Quotation"
                    >
                        <Save size={16} className="mr-1" />
                        <span>Save</span>
                    </button>
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        title="Delete Quotation"
                    >
                        <Trash size={16} className="mr-1" />
                        <span>Delete</span>
                    </button>
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        title="Previous"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        <span>Previous</span>
                    </button>
                    <button className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white" title="Next">
                        <ArrowRight size={16} className="mr-1" />
                        <span>Next</span>
                    </button>
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        title="Print Quotation"
                    >
                        <Printer size={16} className="mr-1" />
                        <span>Print</span>
                    </button>
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        onClick={handleSuspend}
                        title="Suspend Draft"
                    >
                        <PauseCircle size={16} className="mr-1" />
                        <span>Suspend</span>
                    </button>
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        onClick={handleToggleAuthHistory}
                        title="View Authorization History"
                    >
                        <History size={16} className="mr-1" />
                        <span>Auth History</span>
                    </button>
                </div>
                <div className="flex space-x-2">
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                        onClick={handleClose}
                    >
                        <X size={16} className="mr-1" />
                        <span>Close</span>
                    </button>
                </div>
            </div>

            <div className="px-4 py-2 bg-white border-b">
                <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">Main</button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-white">
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Document No.</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={quotation.documentNo}
                                    onChange={(e) => handleFieldChange("documentNo", e.target.value)}
                                    className={`flex-1 border ${validationErrors.documentNo ? "border-red-500" : "border-gray-300"} rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                />
                                <button className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-2">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            {validationErrors.documentNo && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.documentNo}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Account</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={quotation.vendorAccount}
                                    onChange={(e) => handleFieldChange("vendorAccount", e.target.value)}
                                    className={`flex-1 border ${validationErrors.vendorAccount ? "border-red-500" : "border-gray-300"} rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                />
                                <button
                                    className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-2"
                                    onClick={handleToggleVendorSelector}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            {validationErrors.vendorAccount && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.vendorAccount}</p>
                            )}

                            {vendorSelectorVisible && (
                                <div className="absolute mt-1 w-64 bg-white border border-gray-300 rounded shadow-lg z-10">
                                    <div className="p-2 border-b border-gray-300">
                                        <input
                                            type="text"
                                            placeholder="Search vendors..."
                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        />
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                        {vendors.map((vendor: any) => (
                                            <div
                                                key={vendor.id}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleSelectVendor(vendor)}
                                            >
                                                <div className="text-sm font-medium">{vendor.name}</div>
                                                <div className="text-xs text-gray-500">{vendor.code}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {quotation.vendorName && (
                            <div className="mb-4">
                                <div className="text-sm text-gray-700">{quotation.vendorName}</div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={quotation.date}
                                    onChange={(e) => handleFieldChange("date", e.target.value)}
                                    className={`flex-1 border ${validationErrors.date ? "border-red-500" : "border-gray-300"} rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                />
                                <button
                                    className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-2"
                                    onClick={handleToggleCalendar}
                                >
                                    <Calendar size={16} />
                                </button>
                            </div>
                            {validationErrors.date && <p className="text-red-500 text-xs mt-1">{validationErrors.date}</p>}

                            {calendarVisible && (
                                <div className="absolute mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 p-2">
                                    <div className="grid grid-cols-7 gap-1">
                                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                            <div key={day} className="text-center text-xs font-medium p-1">
                                                {day}
                                            </div>
                                        ))}
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                            <button
                                                key={day}
                                                className="w-8 h-8 text-sm hover:bg-gray-100 rounded"
                                                onClick={() => {
                                                    const date = new Date()
                                                    const formattedDate = `${day.toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
                                                    handleSelectDate(formattedDate)
                                                }}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Narration</label>
                            <textarea
                                value={quotation.narration}
                                onChange={(e) => handleFieldChange("narration", e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows={2}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    {validationErrors.items && <p className="text-red-500 text-sm mb-2">{validationErrors.items}</p>}

                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="w-10 px-2 py-2 text-center text-xs font-medium">#</th>
                                <th className="px-4 py-2 text-left text-xs font-medium">Item</th>
                                <th className="px-4 py-2 text-left text-xs font-medium">Units</th>
                                <th className="px-4 py-2 text-right text-xs font-medium">Quantity</th>
                                <th className="px-4 py-2 text-right text-xs font-medium">Rate</th>
                                <th className="px-4 py-2 text-right text-xs font-medium">Gross</th>
                                <th className="px-4 py-2 text-right text-xs font-medium">Discount</th>
                                <th className="w-10 px-2 py-2 text-center text-xs font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {quotation.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-2 py-2 whitespace-nowrap text-center text-sm">{item.id}</td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={item.item}
                                                onChange={(e) => handleItemChange(item.id, "item", e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-l px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <button
                                                className="bg-gray-100 border border-l-0 border-gray-300 rounded-r px-2"
                                                onClick={() => handleToggleItemSelector(item.id)}
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <select
                                            value={item.units}
                                            onChange={(e) => handleItemChange(item.id, "units", e.target.value)}
                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value="">Select</option>
                                            {units.map((unit: any) => (
                                                <option key={unit.id} value={unit.name}>
                                                    {unit.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <input
                                            type="number"
                                            value={item.quantity || ""}
                                            onChange={(e) => handleItemChange(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                                            className="w-full border border-gray-300 px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            step="0.001"
                                            min="0"
                                        />
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <input
                                            type="number"
                                            value={item.rate || ""}
                                            onChange={(e) => handleItemChange(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                                            className="w-full border border-gray-300 px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            step="0.01"
                                            min="0"
                                        />
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-right text-sm">{item.gross.toFixed(2)}</td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <input
                                            type="number"
                                            value={item.discount || ""}
                                            onChange={(e) => handleItemChange(item.id, "discount", Number.parseFloat(e.target.value) || 0)}
                                            className={`w-full border ${validationErrors.discount && item.discount > item.gross ? "border-red-500" : "border-gray-300"
                                                } px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                            step="0.01"
                                            min="0"
                                        />
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-center">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleRemoveRow(item.id)}
                                            disabled={quotation.items.length <= 1}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {itemSelectorVisible && selectedItemId !== null && (
                        <div className="absolute mt-1 w-64 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <div className="p-2 border-b border-gray-300">
                                <input
                                    type="text"
                                    placeholder="Search items..."
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                />
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectItem(item)}
                                    >
                                        <div className="text-sm font-medium">{item.name}</div>
                                        <div className="text-xs text-gray-500">{item.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end mt-2 space-x-2">
                        <button
                            className="flex items-center px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                            onClick={handleAddRow}
                            title="Add Item Row"
                        >
                            <Plus size={14} className="mr-1" />
                            <span>Add Row</span>
                        </button>
                    </div>

                    <div className="flex justify-end mt-4">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <div className="bg-gray-100 px-3 py-2 text-sm font-medium">Net:</div>
                            <div className="px-3 py-2 text-sm font-medium text-blue-600">
                                {currency} {netTotal.toFixed(2)}
                            </div>
                            <button className="p-2 text-gray-500 hover:text-gray-700 border-l border-gray-300" title="View Details">
                                <Info size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end px-4 py-2 bg-gray-100 border-t">
                <div className="flex items-center">
                    <button
                        className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm bg-white mr-2"
                        onClick={handleToggleInfoSidebar}
                    >
                        <span>Info Sidebar</span>
                    </button>
                    <div className="flex">
                        <button className="p-1 border border-gray-300 rounded-l bg-white">
                            <Settings size={16} />
                        </button>
                        <button className="p-1 border border-l-0 border-gray-300 rounded-r bg-white">
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

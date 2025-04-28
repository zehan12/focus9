"use client"

import type React from "react"
import { useEffect } from "react"
import { ArrowUpDown, BarChart, FileText, Filter, RefreshCw, Settings, Trash } from "lucide-react"
import {
    fetchQuotations,
    Quotation,
    selectQuotations,
    selectQuotationsLoading,
    setCurrentQuotation,
} from "@/store/quotations/slice"
import {
    selectCurrentPage,
    selectDefaultView,
    selectItemsPerPage,
    setActiveTab,
    setCurrentPage,
    toggleDefaultView,
} from "@/store/ui/slice"
import { useAppDispatch, useAppSelector } from "@/hooks"

export const ListViewContent: React.FC = () => {
    const dispatch = useAppDispatch()
    const quotations = useAppSelector(selectQuotations)
    const loading = useAppSelector(selectQuotationsLoading)
    const currentPage = useAppSelector(selectCurrentPage)
    const itemsPerPage = useAppSelector(selectItemsPerPage)
    const defaultView = useAppSelector(selectDefaultView)

    useEffect(() => {
        dispatch(fetchQuotations())
    }, [dispatch])

    const handleViewQuotation = (quotation: Quotation | null) => {
        dispatch(setCurrentQuotation(quotation))
        dispatch(setActiveTab("form"))
    }

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const handleDefaultViewToggle = () => {
        dispatch(toggleDefaultView())
    }

    const totalPages = Math.ceil(quotations.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedQuotations = quotations.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-2 bg-gray-100 border-b flex items-center">
                <div className="flex items-center">
                    <button className="px-3 py-1 text-blue-600 border-b-2 border-blue-600 font-medium text-sm">
                        All Vouchers
                    </button>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="default-view"
                            className="mr-2"
                            checked={defaultView}
                            onChange={handleDefaultViewToggle}
                        />
                        <label htmlFor="default-view" className="text-sm text-gray-600">
                            Set as default view
                        </label>
                    </div>
                    <div className="flex space-x-1">
                        <button className="p-1 text-gray-500 hover:text-gray-700" title="Sort">
                            <ArrowUpDown size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700" title="Filter">
                            <Filter size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700" title="Export">
                            <FileText size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700" title="Refresh">
                            <RefreshCw size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700" title="Delete">
                            <Trash size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700" title="Settings">
                            <Settings size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700" title="Reports">
                            <BarChart size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="w-10 px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                    <input type="checkbox" />
                                </th>
                                <th className="w-10 px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Voucher Number</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Vendor</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Created by</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Modified By</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Created Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Modified</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Created time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Modified Time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Authorization</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedQuotations.map((quotation, index) => (
                                <tr
                                    key={quotation.id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    onClick={() => handleViewQuotation(quotation)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <td className="px-2 py-3 whitespace-nowrap text-center">
                                        <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                                    </td>
                                    <td className="px-2 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.date}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{quotation.documentNo}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {quotation.vendorName || quotation.vendorAccount}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.createdBy}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.modifiedBy}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.createdDate}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.modifiedDate}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.createdTime}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{quotation.modifiedTime}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {quotation.suspended ? "Suspended" : quotation.status}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">{quotation.authorization}</td>
                                </tr>
                            ))}
                            {paginatedQuotations.length === 0 && (
                                <tr>
                                    <td colSpan={13} className="px-4 py-8 text-center text-gray-500">
                                        No quotations found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="border-t border-gray-200 px-4 py-2 flex justify-end items-center bg-gray-50">
                <div className="flex space-x-2 text-sm">
                    <button
                        className="px-3 py-1 border border-gray-300 rounded"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        First
                    </button>
                    <button
                        className="px-3 py-1 border border-gray-300 rounded"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`px-3 py-1 border border-gray-300 rounded ${currentPage === page ? "bg-blue-600 text-white" : ""
                                }`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="px-3 py-1 border border-gray-300 rounded"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                    <button
                        className="px-3 py-1 border border-gray-300 rounded"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    )
}
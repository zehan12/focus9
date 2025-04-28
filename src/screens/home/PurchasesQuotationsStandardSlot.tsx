import { ListViewContent, FormViewContent } from "@/components/organisms";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createNewQuotation } from "@/store/quotations/slice";
import { selectActiveTab, setActiveTab } from "@/store/ui/slice";
import { ChevronRight, FileText, Printer, Settings, ScanBarcode, FilePenLine, Trash2, Power, CircleX } from "lucide-react";

export const PurchaseQuotationStandardSlot = () => {
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector(selectActiveTab)

    const handleNewQuotation = () => {
        console.log("clicked")
        dispatch(createNewQuotation())
        dispatch(setActiveTab("form"))
    }

    const toolbarItems = [
        { icon: FileText, label: "New", onClick: handleNewQuotation },
        { icon: FilePenLine, label: "Edit", onClick: () => { } },
        { icon: Printer, label: "Print", onClick: () => { } },
        { icon: Trash2, label: "Delete", onClick: () => { } },
        { icon: Power, label: "Suspend", onClick: () => { } },
        { icon: ScanBarcode, label: "Print barcode", onClick: () => { } },
        { icon: FileText, label: "Export to XML", onClick: () => { } },
        { icon: Settings, label: "Setting", onClick: () => { } },
        { icon: CircleX, label: "Close", onClick: () => { } },
    ];

    return (
        <div className="flex flex-col w-full h-screen bg-gray-100">
            <div className="bg-white border-b h-20 pt-4">
                <div className="flex justify-between items-baseline">
                    <div className="px-6 py-3 flex items-center text-sm text-gray-600 space-x-2">
                        <span>Inventory</span>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span>Transactions</span>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span>Purchases</span>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span className="text-blue-800 font-medium">Purchases Quotations-Standard</span>
                    </div>

                    <div className="flex  px-20 py-2">
                        <div className="flex flex-wrap gap-8 overflow-auto">
                            {toolbarItems.map(({ icon: Icon, label, onClick }, idx) => (
                                <button
                                    key={idx}
                                    className="flex flex-col text-xs items-center justify-evenly gap-1.5 cursor-pointer"
                                    onClick={onClick}
                                >
                                    <Icon color="#3f3f46" size={17} />
                                    <span className="text-[#52525c]">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {activeTab === "list" ? <ListViewContent /> : <FormViewContent />}
            </div>
        </div>
    );
};



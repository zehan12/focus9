import {
    Home,
    DollarSign,
    Package,
    PenTool,
    Truck,
    ShoppingCart,
    BarChart,
    Settings,
    Users,
    FileText,
} from "lucide-react"
import { SidebarItem } from "@/components/atoms"
import { SidebarMenu } from "../SidebarMenu"

export const AppSidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <SidebarItem icon={<Home size={20} />} title="Home" path="/" />
            <SidebarItem icon={<Users size={20} />} title="HRMS" path="/hrms" />
            <SidebarItem icon={<FileText size={20} />} title="ESS" path="/ess" />
            <SidebarMenu
                icon={<DollarSign size={20} />}
                title="Financials"
                items={[
                    {
                        title: "Transactions",
                        items: [
                            {
                                title: "Purchases",
                                items: [{ title: "Purchase Invoice", path: "/financials/transactions/purchases/purchase-invoice" }],
                            },
                        ],
                    },
                ]}
            />
            <SidebarMenu
                icon={<Package size={20} />}
                title="Inventory"
                items={[
                    {
                        title: "Transactions",
                        items: [
                            {
                                title: "Purchases",
                                items: [
                                    { title: "Request for Quote", path: "/inventory/transactions/purchases/request-for-quote" },
                                    {
                                        title: "Purchases Quotations-Standard",
                                        path: "/inventory/transactions/purchases/quotations-standard",
                                    },
                                    { title: "Purchases Orders Standard", path: "/inventory/transactions/purchases/orders-standard" },
                                    { title: "Material Receipt Notes", path: "/inventory/transactions/purchases/material-receipt-notes" },
                                    { title: "Purchase Quotation", path: "/inventory/transactions/purchases/purchase-quotation" },
                                    { title: "PO Screen Test", path: "/inventory/transactions/purchases/po-screen-test" },
                                ],
                            },
                        ],
                    },
                    { title: "Sales", items: [] },
                    { title: "Stocks", items: [] },
                    { title: "Hold/Unhold Stock", path: "/inventory/hold-unhold-stock" },
                    { title: "Sales Screens", items: [] },
                    { title: "Purchase Screens", items: [] },
                    { title: "Stock Reconciliation", path: "/inventory/stock-reconciliation" },
                ]}
            />
            <SidebarItem icon={<PenTool size={20} />} title="Fixed Asset" path="/fixed-asset" />
            <SidebarItem icon={<Truck size={20} />} title="Production" path="/production" />
            <SidebarItem icon={<ShoppingCart size={20} />} title="Point of Sale" path="/pos" />
            <SidebarItem icon={<BarChart size={20} />} title="Quality Control" path="/quality-control" />
            <SidebarItem icon={<Settings size={20} />} title="Settings" path="/settings" />
        </div>
    )
}

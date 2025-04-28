
import { ActiveBarGraphComp, BarChartComp, LineChartComp, PieChartComp } from "@/components/molecules"
import { ChevronRight, FileText, Truck, Users, Package, PieChart, Calendar } from "lucide-react"
import { NavLink } from "react-router"

export const DashboardSlot = () => {
    return (<>
        <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="text-sm text-gray-500 flex items-center">
                    <span>Home</span>
                    <ChevronRight size={14} className="mx-1" />
                    <span>Dashboard</span>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Implemented Features</h2>
                <NavLink to={"/inventory/transactions/purchases/quotations-standard"} className={"underline text-blue-600 hover:text-blue-500"}>
                    Purchase Quotaitons Standards
                </NavLink>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Quick Access</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <QuickAccessCard
                        icon={<FileText className="text-blue-500" />}
                        title="Purchase Invoice"
                        count={12}
                        path="/financials/transactions/purchases/purchase-invoice"
                    />
                    <QuickAccessCard
                        icon={<Truck className="text-green-500" />}
                        title="Sales Order"
                        count={8}
                        path="/sales/transactions/sales-order"
                    />
                    <QuickAccessCard
                        icon={<Users className="text-purple-500" />}
                        title="Employee Records"
                        count={45}
                        path="/hrms/employee-records"
                    />
                    <QuickAccessCard
                        icon={<Package className="text-orange-500" />}
                        title="Inventory Items"
                        count={156}
                        path="/inventory/items"
                    />
                </div>
            </div>

            <div className="mb-8 overflow-auto">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">General</h2>
                <div className="flex justify-evenly w-full gap-2">
                    <LineChartComp />
                    <BarChartComp />
                    <PieChartComp />
                    <ActiveBarGraphComp />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Transactions</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Voucher Number
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Created by
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Modified By
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Created Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">17/07/2023</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{160 - index}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">sujatha</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">sujatha</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14:{39 - index}:05</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Authorized
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Financial Summary</h3>
                        <select onSelect={undefined} className="text-sm border border-gray-300 rounded px-2 py-1">
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>This Quarter</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <PieChart size={200} className="text-gray-300" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Upcoming Activities</h3>
                        <button className="text-blue-600 text-sm">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 p-2 rounded mr-3">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">
                                        {index === 0 ? "Monthly Financial Review" : index === 1 ? "Inventory Audit" : "Staff Meeting"}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {index === 0 ? "Tomorrow, 10:00 AM" : index === 1 ? "July 25, 2:00 PM" : "July 28, 9:30 AM"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    </>)
}


function QuickAccessCard({
    icon,
    title,
    count,
    path,
}: {
    icon: React.ReactNode
    title: string
    count: number
    path: string
}) {
    return (
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="p-3 rounded-full bg-gray-100">{icon}</div>
                <span className="text-2xl font-semibold text-gray-800">{count}</span>
            </div>
            <h3 className="mt-3 font-medium text-gray-700">{title}</h3>
            <div className="mt-2">
                <a href={path} className="text-sm text-blue-600 flex items-center">
                    View Details <ChevronRight size={14} className="ml-1" />
                </a>
            </div>
        </div>
    )
}

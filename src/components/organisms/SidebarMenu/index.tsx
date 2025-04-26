import { NestedMenuItem } from "@/components/molecules"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

export const SidebarMenu = ({
    icon,
    title,
    items,
    defaultOpen = false,
}: {
    icon: React.ReactNode
    title: string
    items: unknown[]
    defaultOpen?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-700"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span>{title}</span>
                </div>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isOpen && (
                <div className="bg-gray-900">
                    {items.map((item, index) => (
                        <NestedMenuItem key={index} item={item} level={1} />
                    ))}
                </div>
            )}
        </div>
    )
}
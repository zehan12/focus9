/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export const NestedMenuItem = ({
    item,
    level,
}: {
    item: any;
    level: number
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const hasChildren = item.items && item.items.length > 0

    const paddingLeft = `${level * 12 + 16}px`

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between py-2 hover:bg-gray-700 text-left"
                    style={{ paddingLeft }}
                >
                    <span>{item.title}</span>
                    {isOpen ? <ChevronDown size={14} className="mr-4" /> : <ChevronRight size={14} className="mr-4" />}
                </button>

                {isOpen && (
                    <div>
                        {item.items.map((subItem: any, index: number) => (
                            <NestedMenuItem key={index} item={subItem} level={level + 1} />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <a href={item.path || "#"} className="block py-2 hover:bg-gray-700" style={{ paddingLeft }}>
            {item.title}
        </a>
    )
}

export const SidebarItem = ({
    icon,
    title,
    path,
}: {
    icon: React.ReactNode
    title: string
    path: string
}) => {
    return (
        <a href={path} className="flex items-center gap-3 p-4 hover:bg-gray-700">
            {icon}
            <span>{title}</span>
        </a>
    )
}
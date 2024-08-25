export const Avatar = ({name, size = "small"}: { name: string, size?: "small" | "big" }) => {
    const initials = name.trim().split(' ').map((subName, index) => index < 2 ? subName[0].toUpperCase() : "").join("")

    return (
        <div
            className={`relative inline-flex items-center justify-center ${size === "small" ? 'w-8 h-8' : 'w-10 h-10'} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-700`}>
            <span
                className={`font-medium text-gray-600 dark:text-gray-300 ${size === "small" ? 'text-sx' : 'text-md'}`}>{initials}</span>
        </div>
    )
}
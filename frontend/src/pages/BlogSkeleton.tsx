export const BlogSkeleton = () => {
    return (
        <div className={"flex justify-center"}>
            <div className="flex flex-col w-full max-w-screen-md animate-pulse border-b-2 border-slate-300 p-4">
                <div className="flex items-center mt-4">
                    <svg className="w-10 h-10 me-3 text-gray-300" aria-hidden="true"
                         xmlns="http://www.w3.org/4000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-300 rounded-full "></div>
                    </div>
                </div>
                <div role="status" className="max-w-screen-md mt-4">
                    <div className="h-4 bg-gray-300 rounded-full w-80 mb-4"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-full max-w-screen-md mb-2.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full mb-2.5 max-w-[600px]"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-full max-w-screen-md mb-2.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-full max-w-screen-md mb-2.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full max-w-[250px]"></div>
                </div>
            </div>
        </div>
    )
}
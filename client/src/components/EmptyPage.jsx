import { FcEmptyTrash } from "react-icons/fc";

export default function EmptyPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <FcEmptyTrash className="text-[15rem] text-gray-400" />
            <h1 className="w-full text-center font-bold text-3xl text-gray-400 mt-2">
                Nothing here at the moment...
            </h1>
        </div>
    )
}
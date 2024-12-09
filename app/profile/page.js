"use client"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"

const Page = () => {
    const { userInformation } = useAuth()

    console.log(userInformation)

    return (
        <div className="w-[600px] flex justify-center">
            <div className="flex flex-col gap-4 items-center text-center">
                <Image
                    src={'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'}
                    alt="Default profile picture"
                    width={100}
                    height={100}
                    priority
                    className="w-[100px] h-[100px]"
                />
                <div className="flex flex-col">
                    <h3 className="text-[20px] font-bold">@henryosterweis</h3>
                    <h4 className="text-[20px] font-bold text-[#D9D9D9]">Joined Dec 2024</h4>
                </div>
            </div>
        </div>
    )
}

export default Page
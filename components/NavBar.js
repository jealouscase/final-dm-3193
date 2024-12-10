"use client"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { FiHome, FiLogIn, FiLogOut } from "react-icons/fi"
import { FaMagnifyingGlass, FaRegBookmark } from "react-icons/fa6"
import { CgProfile } from "react-icons/cg"

const NavBar = () => {
    const { isLoggedIn, logoutUserFunction } = useAuth()

    return (
        <div className="flex flex-col gap-6 w-[200px]">
            <Link href="/" className="w-min flex gap-3 text-[24px] items-center"><FiHome className="w-7 h-7"/>Home</Link>
            <Link href="/explore" className="w-min flex gap-3 text-[24px] items-center"><FaMagnifyingGlass className="w-7 h-7" />Explore</Link>
            {/* <Link href="/" className="w-min flex gap-3 text-[24px] items-center"><FaRegBookmark className="w-7 h-7" />Bookmarks</Link> */}
            <nav>
                <ul className="flex flex-col gap-6 justify-end">
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link href="/profile" className="w-min flex gap-3 text-[24px] items-center"><CgProfile className="w-7 h-7" />Profile</Link>
                            </li>
                            <li>
                                <a onClick={logoutUserFunction} className="flex gap-3 text-[24px] items-center"><FiLogOut className="w-7 h-7" />Log Out</a>
                            </li>
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link href="/login" className="w-min flex gap-3 text-[24px] items-center"><FiLogIn className="w-7 h-7" />Login</Link>
                            </li>
                            <li>
                                <Link href="/signup" className="flex gap-3 text-[24px] items-center"><CgProfile className="w-7 h-7" />Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
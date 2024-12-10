import Link from "next/link";
import { LuChefHat } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";

const Header = () => {
    return (
        <div className="flex py-8 items-center gap-[100px] bg-white">
            <div className="w-[200px] flex items-center gap-2">
                <LuChefHat className="h-12 w-12" />
                <Link href={'/'} className="font-semibold text-[36px]">Deglaze</Link>
            </div>
            <Link href={'/'} className="border w-[600px] px-[27px] py-[14px] rounded-[36px] text-[20px]">Search Recipes</Link>
            <Link href={'/new'} className="p-[14px] bg-[#789DBC] rounded-[36px] text-white text-[20px] flex justify-between gap-2 items-center"><FaPlus className="w-6 h-6" />New Recipe</Link>
        </div>
    )
}

export default Header
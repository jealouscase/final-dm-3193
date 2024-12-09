"use client"
import RecipeForm from "@/components/RecipeForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter()
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        if (!isLoggedIn) router.push('/login')
    }, [isLoggedIn])

    return (
        <div>
            <h1 className="font-bold text-[24px]">Post a New Recipe</h1>
            <RecipeForm />
        </div>
    )
}
 
export default Page
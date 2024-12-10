import Image from "next/image"
import { FaRegClock } from "react-icons/fa6"
import { PiForkKnife } from "react-icons/pi"
import { LuChefHat } from "react-icons/lu"
import { FaRegHeart, FaRegBookmark } from "react-icons/fa"
import { useState } from "react"

const Post = ({ userId, ingredients, instructions, createdAt, difficulty, totalTime, title, servings, imageUrl }) => {
    const formattedDate = new Date(createdAt.seconds * 1000).toLocaleString()
    
    const initialLikes = createdAt.seconds % 900 + 100
    const initialSaves = createdAt.seconds % 90 + 10
    
    const [likes, setLikes] = useState(initialLikes)
    const [saves, setSaves] = useState(initialSaves)
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    const handleLike = () => {
        setLikes(prev => isLiked ? prev - 1 : prev + 1)
        setIsLiked(!isLiked)
    }

    const handleSave = () => {
        setSaves(prev => isSaved ? prev - 1 : prev + 1)
        setIsSaved(!isSaved)
    }

    return (
        <div className="w-full flex flex-col gap-5 border-b-[1px] py-5">
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-4">
                    <Image
                        src={'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'}
                        alt="Default profile picture"
                        width={50}
                        height={50}
                        priority
                    />
                    <div className="flex flex-col justify-center">
                        <p className="font-bold">@{userId}</p>
                        <p className="text-[#A6A6A6]">{formattedDate}</p>
                    </div>
                </div>
            </div>
            {imageUrl && (
                <div className="relative w-[full] h-[400px]">
                    <Image
                        src={imageUrl}
                        alt={title}
                        className="object-cover"
                        fill
                    />
                </div>
            )}
            <div>
                <h2 className="font-bold text-xl">{title}</h2>
                <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                        <FaRegClock />
                        <p className="text-[#A6A6A6]">{totalTime} mins</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <PiForkKnife />
                        <p className="text-[#A6A6A6]">{servings} servings</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <LuChefHat />
                        <p className="text-[#A6A6A6]">{difficulty}</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-xl">Ingredients</h3>
                <div>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.amount} {ingredient.unit} {ingredient.item}
                                {ingredient.notes && ` (${ingredient.notes})`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-xl">Instructions</h3>
                <div>
                    <ol className="list-decimal list-outside left-4 relative">
                        {instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div 
                    className="flex gap-[6px] items-center cursor-pointer"
                    onClick={handleLike}
                >
                    <FaRegHeart className={isLiked ? "text-pink-500" : ""} />
                    <p className={isLiked ? "text-pink-500" : ""}>{likes}</p>
                </div>
                <div 
                    className="flex gap-[6px] items-center cursor-pointer"
                    onClick={handleSave}
                >
                    <FaRegBookmark className={isSaved ? "text-blue-500" : ""} />
                    <p className={isSaved ? "text-blue-500" : ""}>{saves}</p>
                </div>
            </div>
        </div>
    )
}

export default Post
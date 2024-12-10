"use client"
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext' 
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const RecipeForm = () => {
    const { userInformation, appInitialized } = useAuth()
    const [recipeData, setRecipeData] = useState({
        title: '',
        totalTime: '',
        servings: '',
        difficulty: 'easy',
        imageUrl: ''
    })
    const [error, setError] = useState('')

    const [ingredients, setIngredients] = useState([{ amount: '', unit: '', item: '', notes: '' }])
    const [instructions, setInstructions] = useState([''])
    const router = useRouter()

    const handleBasicInfoChange = (e) => {
        const { name, value } = e.target
        setRecipeData(prev => ({...prev, [name]: value}))
    }

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients]
        newIngredients[index] = {...newIngredients[index], [field]: value}
        setIngredients(newIngredients)
    }

    const addIngredient = () => {
        setIngredients([...ingredients, { amount: '', unit: '', item: '', notes: '' }])
    }

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...instructions]
        newInstructions[index] = value
        setInstructions(newInstructions)
    }

    const addInstruction = () => {
        setInstructions([...instructions, ''])
    }

    const removeInstruction = (index) => {
        setInstructions(instructions.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const db = getFirestore(appInitialized)
        try {
            const data = {
                ...recipeData,
                ingredients,
                instructions,
                createdAt: new Date(),
                userId: userInformation.email.split('@')[0]
            }
            const docRef = await addDoc(collection(db, 'recipes'), data)
            router.push('/')
            // console.log('Recipe added with ID: ', docRef.id)
        } catch (error) {
            setError(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-8">
                <div className="mb-4">
                    <div className="block mb-2">
                        Title <span className='text-red-500'>*</span>
                        <input
                            type="text"
                            name="title"
                            value={recipeData.title}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded border-gray-300 text-black"
                            placeholder='One Bowl Chocolate Chip Cookie'
                            required
                        />
                    </div>
                    <div className="block mb-2">
                        Image URL
                        <input
                            type="url"
                            name="imageUrl"
                            value={recipeData.imageUrl}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded border-gray-300 text-black"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="block">
                        Total Time (minutes) <span className='text-red-500'>*</span>
                        <input
                            type="number"
                            name="totalTime"
                            value={recipeData.totalTime}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded border-gray-300 text-black"
                            placeholder='20'
                            required
                        />
                    </div>
                    <div className="block">
                        Servings <span className='text-red-500'>*</span>
                        <input
                            type="number"
                            name="servings"
                            value={recipeData.servings}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded border-gray-300 text-black"
                            placeholder='4'
                            required
                        />
                    </div>
                    <div className="block">
                        Difficulty <span className='text-red-500'>*</span>
                        <select
                            name="difficulty"
                            value={recipeData.difficulty}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded border-gray-300 text-black"
                            required
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 items-start mb-4">
                        <div className='flex flex-col'>
                            <p>Amount <span className='text-red-500'>*</span></p>
                            <input
                                type="number"
                                value={ingredient.amount}
                                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                placeholder="1.5"
                                className="w-24 rounded border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p>Unit <span className='text-red-500'>*</span></p>
                            <input
                                type="text"
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                placeholder="cups"
                                className="w-24 rounded border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p>Item <span className='text-red-500'>*</span></p>
                            <input
                                type="text"
                                value={ingredient.item}
                                onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                                placeholder="flour"
                                className="flex-1 rounded border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p>Notes</p>
                            <input
                                type="text"
                                value={ingredient.notes}
                                onChange={(e) => handleIngredientChange(index, 'notes', e.target.value)}
                                placeholder="(optional)"
                                className="w-32 rounded border-gray-300 text-black"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="px-2 py-1 text-red-600 hover:text-red-800"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addIngredient}
                    className="text-blue-600 hover:text-blue-700"
                >
                    + Add Ingredient
                </button>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 items-start mb-4">
                        <span className="mt-2">{index + 1}.</span>
                        <textarea
                            value={instruction}
                            onChange={(e) => handleInstructionChange(index, e.target.value)}
                            placeholder="Enter instruction step"
                            className="flex-1 rounded border-gray-300 text-black"
                            rows="2"
                        />
                        <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="px-2 py-1 text-red-600 hover:text-red-800"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addInstruction}
                    className="text-blue-600 hover:text-blue-800"
                >
                    + Add Instruction
                </button>
            </div>

            <div className='flex flex-col text-center gap-2'>
                <button
                    type="submit"
                    className="w-full bg-[#789DBC] text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Post Recipe
                </button>
                {error.length > 0 && <p>{'An error occurred while submitting:' + error}</p>}
            </div>
        </form>
    )
}

export default RecipeForm
import Image from "next/image";

const Post = () => {
    const ingredientsJSON = {
        "ingredients": [
            {
                "item": "Butter",
                "amount": 0.5,
                "unit": "cup",
                "notes": "melted"
            },
            {
                "item": "Brown Sugar",
                "amount": 0.67,
                "unit": "cup"
            },
            {
                "item": "Sugar",
                "amount": 0.33,
                "unit": "cup"
            },
            {
                "item": "Egg",
                "amount": 1,
                "unit": "large"
            },
            {
                "item": "Vanilla",
                "amount": 1,
                "unit": "teaspoon"
            },
            {
                "item": "Flour",
                "amount": 1.33,
                "unit": "cup",
                "notes": "can use 1.5 cups for thicker cookies"
            },
            {
                "item": "Baking Soda",
                "amount": 0.5,
                "unit": "teaspoon"
            },
            {
                "item": "Salt",
                "amount": 0.5,
                "unit": "teaspoon"
            },
            {
                "item": "Milk Chocolate Chips",
                "amount": 0.5,
                "unit": "cup"
            },
            {
                "item": "Semi-Sweet Chocolate Chips",
                "amount": 0.5,
                "unit": "cup"
            }
        ]
    }

    const instructionsJSON = [
        {
            step: 1,
            text: "In a microwave safe bowl, melt butter in the microwave until melted. Add brown sugar and sugar."
        },
        {
            step: 2,
            text: "Whisk or stir vigorously until smooth. Add egg and vanilla and whisk until silky."
        },
        {
            step: 3,
            text: "Stir in flour, baking soda, and salt."
        },
        {
            step: 4,
            text: "Fold in milk chocolate and semi-sweet chocolate chips. Cover bowl with plastic wrap. Place in the refigerator and CHILL for at least 30 minutes. The cookie dough gets better with time. If time is on your side, I suggest chilling it for 24-48 hours. Chilling for at least 30 minutes is essential."
        },
        {
            step: 5,
            text: "When ready to bake, preheat oven to 350 degrees. Using a cookie scoop or spoon, place cookie dough on light colored baking sheets. Bake for 10-13 minutes, or until cookies become a light golden color."
        }
    ];
    
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
                        <p className="font-bold">@hosterweis</p>
                        <p className="text-[#A6A6A6]">2h ago</p>
                    </div>
                </div>
                {/* Share icon */}
            </div>
            <div className="relative w-[full] h-[400px]">
                <Image
                    src={'https://www.modernhoney.com/wp-content/uploads/2019/12/One-Bowl-Chocolate-Chip-Cookie-Recipe-6-scaled.jpg'}
                    alt="Main food image"
                    className="object-cover"
                    fill
                />
            </div>
            <div>
                <h2 className="font-bold text-xl">One Bowl Chocolate Chip Cookies</h2>
                <div className="flex gap-5">
                    <div>
                        {/* Icon */}
                        <p className="text-[#A6A6A6]">20 mins</p>
                    </div>
                    <div>
                        <p className="text-[#A6A6A6]">4 servings</p>
                    </div>
                    <div>
                        <p className="text-[#A6A6A6]">Easy</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-xl">Ingredients</h3>
                <div>
                    <ul>
                        {ingredientsJSON.ingredients.map((ingredient, index) => (
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
                        {instructionsJSON.map((instruction) => (
                            <li key={instruction.step}>
                                {instruction.text}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Post;
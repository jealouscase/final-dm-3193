import { useAuth } from "@/context/AuthContext";

const CreateUserForm = () => {
    const { createUserFunction } = useAuth()

    return (
        <div className="flex flex-col gap-4 items-center">
            <form
                onSubmit={(e) => createUserFunction(e)}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-2 w-[300px]">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name="email" className="border rounded-md h-8 px-2" required></input>
                </div>

                <div className="flex flex-col gap-2 w-[300px] mb-4">
                    <label htmlFor="password">A Strong Password</label>
                    <input type="password" name="password" className="border rounded-md h-8 px-2" required></input>
                </div>

                <button type="submit" className="border py-2 px-3 border-black w-[140px] hover:bg-black hover:text-white rounded-md">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default CreateUserForm;
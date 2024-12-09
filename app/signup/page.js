"use client"
import CreateUserForm from "@/components/CreateUserForm";

const SignUpPage = () => {
    return (
        <div className="w-[600px] flex flex-col gap-8">
            <p className="text-center font-bold text-[30px]">Sign up today<br></br>and share your recipe<br></br>with the world</p>
            <CreateUserForm />
        </div>
    );
}
 
export default SignUpPage;
"use client"
import LoginForm from "@/components/LoginForm";

const Login = () => {

    return (
        <div className="w-[600px] flex flex-col gap-8">
            <p className="text-center font-bold text-[30px]">Welcome back!<br></br>A new recipe awaits.</p>
            <LoginForm />
        </div>
    );
}

export default Login;
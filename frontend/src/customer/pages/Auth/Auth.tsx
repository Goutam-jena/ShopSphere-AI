import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchForm = () => setIsLogin(!isLogin);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                {isLogin ? <LoginForm switchForm={switchForm} /> : <SignupForm switchForm={switchForm} />}
            </div>
        </div>
    );
};
export default Auth;
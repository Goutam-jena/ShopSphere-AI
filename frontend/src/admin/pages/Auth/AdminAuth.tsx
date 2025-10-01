import React from 'react';
import AdminLogin from './AdminLogin';

const AdminAuth = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <AdminLogin />
            </div>
        </div>
    );
};

export default AdminAuth;
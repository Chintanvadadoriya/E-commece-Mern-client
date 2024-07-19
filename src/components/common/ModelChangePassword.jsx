import React, { useState } from 'react';
import { Cancel, Update } from './Button';
import CustomInput from './InputField';


function ModelChangePassword({ isOpen, close }) {
    const [passwordManage, setPasswordManage] = useState({
        currentPassword: '',
        newPassword: '',
    })
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordManage({
            ...passwordManage,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('passwordManage', passwordManage)

    };

    return (
        <>
            {
                <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
                    <div class="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 class="text-black font-semibold mb-6 flex justify-center">Change Password</h2>

                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-6">
                            <CustomInput
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordManage.currentPassword}
                                onChange={handleChange}
                                label="Current Password"
                            />
                            <CustomInput
                                id="newPassword"
                                name="newPassword"
                                value={passwordManage.newPassword}
                                onChange={handleChange}
                                label="New Password"
                            />

                            <button
                                type="submit"
                                className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </form>

                        <div class="mt-5 flex justify-end">
                            <Cancel close={close} />
                            <Update Update={"Update"} />
                        </div>
                    </div>
                </div>

            }

        </>
    );
}

export default ModelChangePassword;

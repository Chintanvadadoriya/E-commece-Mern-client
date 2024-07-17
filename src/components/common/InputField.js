import React from 'react';

const CustomInput = ({ id, name, value, onChange, label }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="p-2 h-11 mt-3 block w-full border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-600 sm:text-sm outline-none"
            />
            <hr class="mt-4 border-gray-200 dark:border-white" />
        </div>
    );
};

export default CustomInput;

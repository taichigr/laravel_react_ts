import React, { ChangeEvent, ReactNode, VFC } from "react";

type Props = {
    type: string;
    id: string;
    label: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
};

export const InputField: VFC<Props> = (props) => {
    const { type, id, label, value, onChange, error } = props;
    return (
        <>
            <div className="py-4">
                <label
                    className="block text-gray-800 text-sm font-semibold mb-2"
                    htmlFor={id}
                >
                    {label}
                </label>
                <input
                    className={`mt-1 block w-full py-2 px-3 border ${
                        error ? "border-red-500" : "border-gray-300"
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        </>
    );
};

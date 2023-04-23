import React, { ChangeEvent, ReactNode, VFC } from "react";

type Props = {
    id: string;
    label: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string | null;
};

export const TextareaField: VFC<Props> = (props) => {
    const { id, label, value, onChange, error } = props;
    return (
        <>
            <div className="py-4">
                <label
                    className="block text-gray-800 text-sm font-semibold mb-2"
                    htmlFor={id}
                >
                    {label}
                </label>
                <textarea
                    className={`resize-none w-full h-32 p-2 border border-gray-300 rounded-md ${
                        error ? "border-red-500" : "border-gray-300"
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    id={id}
                    value={value}
                    onChange={onChange}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        </>
    );
};

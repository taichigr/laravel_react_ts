import { ChangeEvent, ReactNode, VFC } from "react";

import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
    type: string;
    id: string;
    label: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: VFC<Props> = (props) => {
    const { type, id, label, value, onChange } = props;
    return (
        <>
            <div className="py-4">
                <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={id}
                >
                    {label}
                </label>
                <input
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

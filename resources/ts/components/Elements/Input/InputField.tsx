import { ChangeEvent, ReactNode, VFC } from "react";

import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
    type: string;
    id: string;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: VFC<Props> = (props) => {
    const { type, id, label, onChange } = props;
    return (
        <>
            <div className="py-4">
                <label htmlFor={id}>{label}</label>
                <input
                    className="p-2 border border-gray-800 rounded w-full focus:bg-gray-100 outline-none"
                    type={type}
                    id={id}
                    onChange={onChange}
                />
            </div>
        </>
    );
};
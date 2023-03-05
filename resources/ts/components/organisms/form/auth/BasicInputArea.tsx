import { ReactNode, VFC } from "react";

import { FieldValues, useForm, UseFormRegister } from "react-hook-form";

type Props = {
    type: string;
    id: string;
    register: UseFormRegister<FieldValues>;
}

export const BasicInputArea: VFC<Props> = (props) => {
    const {type, id, register} = props;
    return (
        <>
            <div className="py-4">
                <label htmlFor={id}>Email</label>
                <input
                    className="p-2 border border-gray-800 rounded w-full focus:bg-gray-100 outline-none"
                    type={type}
                    id={id}
                    {...register(id, {
                        required: "このフォームは必須です",
                    })}
                />
            </div>
        </>
    );
};

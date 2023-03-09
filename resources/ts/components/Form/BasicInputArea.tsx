import { ReactNode, VFC } from "react";

import { FieldErrors, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { BasicInput } from "./BasicInput";
import { ErrorMessage } from "./ErrorMessage";

type Props = {
    type: string;
    id: string;
    label: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
};

export const BasicInputArea: VFC<Props> = (props) => {
    const { type, id, label, register, errors } = props;
    return (
        <>
            <BasicInput type={type} id={id} label={label} register={register} />
            <ErrorMessage id={id} errors={errors} />
        </>
    );
};

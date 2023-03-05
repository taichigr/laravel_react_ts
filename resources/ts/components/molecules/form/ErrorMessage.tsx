import { ReactNode, VFC } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

type Props = {
    id: string;
    errors: FieldErrors<FieldValues>;
};

export const ErrorMessage: VFC<Props> = (props) => {
    const { id,errors } = props;

    const getErrorMessage = (text, errors) => {
        return errors[text] ?? "";
    };

    const errorMessage = getErrorMessage(id, errors);

    return (
        <>
            {errorMessage && (
                <div>
                    <span className="block text-red-400">
                        {errors.submit.message}
                    </span>
                </div>
            )}
        </>
    );
};

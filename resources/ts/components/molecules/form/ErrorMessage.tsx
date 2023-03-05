import { ReactNode, VFC } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

type Props = {
    errors: FieldErrors<FieldValues>;
};

export const ErrorMessage: VFC<Props> = (props) => {
    const { errors } = props;

    const getErrorMessage = (text, errors) => {
        return errors[text] ?? "";
    };

    const text = "submit";
    const errorMessage = getErrorMessage(text, errors);

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

import { ReactNode, VFC } from "react";

type Props = {
    type?: "button" | "submit" | "reset";
    text: string;
};

export const PrimaryButton: VFC<Props> = (props) => {
    const { type, text } = props;

    return (
        <>
            <button
                type={type}
                className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600"
            >
                {text}
            </button>
        </>
    );
};

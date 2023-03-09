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
                className="py-4 px-10 bg-teal-400 text-white rounded-lg hover:bg-teal-300 w-full md:w-auto"
            >
                {text}
            </button>
        </>
    );
};

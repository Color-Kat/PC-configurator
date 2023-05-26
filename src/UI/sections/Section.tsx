import React, {memo, ReactNode} from "react";

// Black background
export const Section: React.FC<{
    className?: string,
    children: ReactNode
}>
    = React.memo(({children, className = ""}) => {
    return (
        <section
            className={"container rounded-xl bg-white bg-opacity-75 text-gray-700 shadow-lg mb-4 px-4 py-4 " + className}
        >
            {children}
        </section>
    );
});

import React, {memo, ReactNode} from "react";

// Black background
export const Section: React.FC<{
    className?: string,
    children: ReactNode
}>
    = React.memo(({children, className = ""}) => {
    return (
        <section className={"container rounded-xl bg-app-dark text-gray-100 shadow-md mb-4 px-4 py-4 " + className}>
            {children}
        </section>
    );
});

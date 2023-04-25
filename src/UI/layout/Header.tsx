import {memo} from "react";

export const Header = memo(() => {
    return (
        <header
            className="flex sticky top-0 w-full h-16 justify-center shadow-xl z-20 app-bg-dark text-app-light shrink-0"
        >
            <div className="container app-accent relative flex items-center justify-between px-5 z-30">
                <h2
                    className="text-gray-100 font-bold font-play text-xl tracking-wider"
                >RX4D-configurator</h2>
            </div>
        </header>
    );
});
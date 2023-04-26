import {memo} from "react";

export const Header = memo(() => {
    return (
        <header
            className="flex sticky top-0 w-full h-16 justify-center shadow-xl z-20 bg-app-dark text-app-light shrink-0"
        >
            <div className="container relative flex items-center justify-between px-5 z-30">
                <h2
                    className="text-app-accent font-bold font-play text-2xl tracking-wider"
                >RX4D-configurator</h2>
            </div>
        </header>
    );
});
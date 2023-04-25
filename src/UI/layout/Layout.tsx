import {memo} from "react";
import {Header} from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export const Layout: React.FC<{ children: React.ReactElement }> = memo(({children}) => {
    return (
        <div
            className="scroll-container flex flex-col h-screen overflow-auto overflow-x-hidden app-bg"
        >

            <Header/>

            <Main>
                {children}
            </Main>

            <Footer />

        </div>
    );
});
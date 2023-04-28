import {memo} from "react";
import {Header} from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {Aside} from "./Aside";

export const Layout: React.FC<{ children: React.ReactElement }> = memo(({children}) => {
    return (
        <div
            className="scroll-container flex flex-col h-screen overflow-auto overflow-x-hidden app-bg"
        >

            <Header/>


            <Main>
                <div className="relative flex md:flex-row flex-col-reverse">

                    <Aside />

                    <div className="max-w-4xl flex-1">
                        {children}
                    </div>

                </div>
            </Main>

            <Footer/>

        </div>
    );
});
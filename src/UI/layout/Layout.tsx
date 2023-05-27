import React, {memo} from "react";
import {Header} from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {Aside} from "./Aside";

// import videoBg from "@assets/videos/bg.mp4";

export const Layout: React.FC<{ children: React.ReactElement }> = memo(({children}) => {
    return (
        <div
            className="scroll-container flex flex-col h-screen overflow-auto overflow-x-hidden bg-app"
        >

            <Header/>

            {/*<video*/}
            {/*    autoPlay*/}
            {/*    muted*/}
            {/*    loop*/}
            {/*    id="video-bg"*/}
            {/*    className="absolute w-full h-full object-cover opacity-50 z-0 pointer-events-none"*/}
            {/*>*/}
            {/*    <source src={videoBg} type="video/mp4"/>*/}
            {/*</video>*/}

            <Main>
                <div className="relative flex lg:flex-row flex-col-reverse">

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
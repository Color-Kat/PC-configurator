import {memo} from "react";

export const Header = memo(() => {
    const goToHomePage = () => {
        window.location = (window as any).location.href.split('?')[0];
    }

    return (
        <header
            className="flex sticky top-0 w-full py-4 justify-center shadow-xl z-20 bg-white text-gray-600 shrink-0"
        >
            <div className="container relative flex items-center justify-between gap-5 px-5 z-30">
                <h2
                    className="font-bold bg-yellow-500 rounded-xl font-dns py-1.5 px-5 text-center text-white tracking-wide cursor-pointer uppercase flex flex-col items-center justify-center"
                    onClick={goToHomePage}
                >
                    <div className="text-base leading-6">Компьютерный</div>
                    <div className="text-2xl leading-6">ослик</div>
                </h2>

                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Как собрать идеальный ПК?"
                        className="h-10 rounded-lg py-1.5 px-2 bg-gray-200 text-gray-700 w-full outline-none"
                    />
                </div>

                <div className="cursor-pointer flex flex-col items-center">
                    🤍
                    <div>Задать вопрос</div>
                </div>

                <div className="cursor-pointer flex flex-col items-center">
                    🔒
                    <div>Сохранить сборку</div>
                </div>
            </div>
        </header>
    );
    // return (
    //     <header
    //         className="flex sticky top-0 w-full py-4 justify-center shadow-xl z-20 bg-app-dark text-app-light shrink-0"
    //     >
    //         <div className="container relative flex items-center justify-between px-5 z-30">
    //             <h2
    //                 className="text-red-500 font-bold font-play text-2xl tracking-wider cursor-pointer"
    //                 onClick={goToHomePage}
    //             >RX4D-configurator</h2>
    //         </div>
    //     </header>
    // );
});
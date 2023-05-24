import {memo} from "react";

import colobitImage from "@assets/colorbit.jpg";

export const Aside = memo(() => {
    const goToColorbit = () => {
        window.open('https://colorbit.ru', '_blank')
    }

    return (
        <aside
            className="lg:w-[300px] lg:h-[370px] mr-4 overflow-hidden sticky bg-app-dark bg-opacity-75 rounded-xl black-shadow p-4 mr-2 mb-4"
            // style={{width: '300px', height: '370px'}}
        >
            <div className="h-full flex flex-col justify-between">
                <div className="cursor-pointer flex lg:flex-col sm:flex-row flex-col gap-5" onClick={goToColorbit}>
                    <div>
                        <h2 className="text-xl font-bold text-center text-gray-300 mb-2">Наша игра про майнинг</h2>

                        <p className="text-gray-400 ">
                            {/*Симулятор майнинга <b>Colorbit</b> — финансовая стратегия компьютерной тематики*/}
                            Построй свою криптоимперию в сюжетной игре про ПК — <b>Colorbit</b>!
                        </p>
                    </div>

                    <img src={colobitImage} alt="" className="rounded-lg lg:w-full sm:w-72"/>
                </div>

                <div className="text-gray-500 text-sm lg:text-center text-right mt-5">
                    <h3>
                        Made by <a href="https://vk.com/color_kat" target="_blank" className="underline">@ColorKat</a>
                    </h3>
                    <h4>
                        powered by <a href="https://colorbit.ru" target="_blank" className="underline">Colorbit.ru</a>
                    </h4>
                </div>

            </div>
        </aside>
    );
});
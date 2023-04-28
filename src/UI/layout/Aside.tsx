import {memo} from "react";

import colobitImage from "@assets/colorbit.jpg";

export const Aside = memo(() => {
    const goToColorbit = () => {
        window.open('https://colorbit.ru', '_blank')
    }

    return (
        <aside
            className="max-w-max h-max mr-4 overflow-hidden sticky bg-app-dark rounded-xl shadow-lg p-4 mr-2 mb-4"
            style={{width: '300px', height: '370px'}}
        >
            <div className="h-full flex flex-col justify-between">
                <div className="cursor-pointer" onClick={goToColorbit}>
                    <h2 className="text-xl font-bold text-center text-gray-300 mb-2">Спонсор проекта</h2>

                    <p className="text-gray-400 ">
                        {/*Симулятор майнинга <b>Colorbit</b> — финансовая стратегия компьютерной тематики*/}
                        Построй свою криптоимперию в сюжетной игре про ПК — <b>Colorbit</b>!
                    </p>

                    <img src={colobitImage} alt="" className="rounded-lg my-5"/>
                </div>

                <div className=" text-gray-500 text-sm text-center">
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
import { memo } from "react";

import anime from "@assets/Banners/anime.jpg";
import fresco from "@assets/Banners/Fresco.png";
import joker from "@assets/Banners/joker.png";
import love from "@assets/Banners/love.png";
import xeon from "@assets/Banners/xeon.png";
import kcas from "@assets/Banners/kcas.png";
import { arrayRand } from "@/utils/arrayRand.ts";

export const AsideAd1 = memo(() => {

    const goToColorbit = () => {
        window.open('https://colorbit.ru', '_blank')
    }

    const ad = arrayRand([
        {
            title: 'Фанат Зеонов?',
            body: <>
                Тогда наша игра <b>Colorbit</b> точно для Тебя! <br />
                Собирай компы для майнинга из ДНС, Али, Авито, и многое другое
            </>,
            image: xeon,
        },
        {
            title: 'Без ума от компов?',
            body: <>
                Попробуй поиграть в <b>Colorbit</b>! <br />
                Это игра прямо в браузере, где Вам предстоит собирать компы из ДНС, Али и Авито...
            </>,
            image: love,
        },
        {
            title: 'Хочешь взорвать KCAS?',
            body: <>
                В игре <b>Colorbit</b> Вы можете издеваться
                над компами, которые сами соберёте!
            </>,
            image: kcas,
        },
        {
            title: 'Жак Фреско',
            body: <>
                уже играет в <b>Colorbit</b>, а ты?
            </>,
            image: fresco,
        },
        {
            title: 'Помоги Джокеру',
            body: <>
                подобрать видеокарту для его компьютера. <br />
                Как насчёт 1050ti?
            </>,
            image: joker,
        },
        // {
        //     title: 'Помоги Джокеру',
        //     body: <>
        //
        //     </>,
        //     image: '',
        // }
    ]);

    return (
        <div className="overflow-hidden bg-white bg-opacity-75 rounded-xl shadow-lg p-4 mb-4 flex flex-col justify-between">
            <div
                className="cursor-pointer flex lg:flex-col sm:flex-row flex-col gap-5"
                onClick={goToColorbit}
            >

                <div>
                    <h2 className="text-xl font-bold text-center text-app-dark">
                        {ad.title}
                    </h2>

                    <p className="text-app-dark mt-2">
                        {ad.body}
                    </p>
                </div>

                <img
                    src={ad.image}
                    alt="Игра про майнинг и компы - Colorbit.ru"
                    className="rounded-lg lg:w-full sm:w-72"
                />

            </div>

            <div className="text-gray-500 text-sm lg:text-center text-right mt-5">
                <h3>
                    Made by <a
                        href="https://vk.com/color_kat"
                        target="_blank"
                        className="underline"
                    >@ColorKat</a>
                </h3>
                <h4
                    title="На этой странице есть секретное слово, которое даст вам бонус в игре Colorbit. Найдите его!"
                >
                    powered by <a
                        href="https://colorbit.ru"
                        target="_blank"
                        className="underline"
                    >Colorbit.ru</a>
                </h4>
            </div>

        </div>
    );
});
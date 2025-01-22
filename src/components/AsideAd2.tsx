import { memo } from "react";

import vpnImage from "@assets/Banners/vpn.png";

export const AsideAd2 = memo(() => {
    return (
        <div className="sticky top-0 overflow-hidden bg-white bg-opacity-75 rounded-xl shadow-lg p-4 mb-4 flex flex-col justify-between">

            <div className="grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-y-2 gap-x-5">
                <h2 className="lg:col-span-1 sm:col-span-2 text-xl font-bold text-center text-app-dark">
                    🚀Гигабитный VPN
                </h2>

                <img
                    src={vpnImage}
                    alt="Color VPN - Гигабитный VPN сервис"
                    className="rounded-lg lg:w-full sm:w-72 object-cover object-center h-48 mt-2 mx-auto"
                />

                <div className="text-app-dark mt-2">
                    <p>
                        <b>ColorVPN</b> - Быстрый как ветер, надёжный как камень. <br />
                        VPN на частном VPS сервере в Германии с каналом 25Гбит/c.
                    </p>

                    <a
                        href="https://vpn.colorbit.ru"
                        target="_blank"
                        className="flex items-center justify-center mt-2 font-play font-bold text-base py-1 text-app rounded-lg  bg-gradient-to-r hover:to-gray-800 from-app-dark to-gray-600 text-center"
                    >
                        Оформить подписку
                    </a>
                </div>
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
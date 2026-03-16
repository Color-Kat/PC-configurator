import { memo } from "react";

import vpnImage from "@assets/Banners/vpn.jpg";

export const AsideAd1 = memo(() => {
    return (
        <div className="sticky top-0 overflow-hidden bg-white bg-opacity-75 rounded-xl shadow-lg p-4 mb-4 flex flex-col justify-between">
            <div className="grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-y-2 gap-x-5">
                <h2 className="lg:block hidden text-xl font-bold text-center text-app-dark mb-1.5">
                    ☹ Глушат интернет?
                </h2>

                <img
                    src={vpnImage}
                    alt="Color VPN - Гигабитный VPN сервис"
                    className="rounded-lg lg:order-none order-2 lg:w-full sm:w-72 object-cover object-center h-48 mt-1 ml-auto"
                />

                <div className="text-app-dark" style={{textWrap:'pretty'}}>
                    <h2 className="lg:hidden block text-xl font-bold text-center text-app-dark mb-2">
                        ☹ Глушат интернет?
                    </h2>

                    <p>
                        Мегабыстрый VPN с обходами белых списков и глушилок для всех ваших устройств
                    </p>

                    <a
                        href="https://t.me/colorvpnbot?start=rx4d"
                        target="_blank"
                        className="flex items-center justify-center lg:mt-3 mt-4 font-play font-bold text-base py-2 text-app rounded-lg bg-gradient-to-r hover:to-gray-800 from-purple-900 to-gray-600 text-center text-xl"
                    >
                        Оформить подписку
                    </a>
                </div>
            </div>
        </div>
    );
});
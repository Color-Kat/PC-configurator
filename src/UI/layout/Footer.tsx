import React, {memo} from 'react';

const Footer: React.FC = () => {


    return (
        <footer className="flex justify-center bg-app-dark shadow-xl pb-5 pt-6 font-play z-10">
            <div className="container px-5 flex-col md:flex-row flex justify-between gap-5">

                <div className="text-gray-300 flex-1">

                    Удобный инструмент для быстрого создания компьютерных сборок. Здесь вы можете сохранить список
                    ссылок на железо из разных магазинов и поделиться этой сборкой с другими с помощью <span title="Секретное сообщение - БАНАН. Сообщите его @ColorKat">одной</span> маленькой
                    ссылки.

                </div>

                <div className="text-gray-400 text-sm text-center">
                    <h3>
                        <i className="fa fa-youtube-play  mr-1"></i>
                        <a href="https://www.youtube.com/RX4D_official" target="_blank" className="underline">RX4D</a>
                    </h3>
                    <h4>
                        <i className="fa fa-vk mr-1"></i>
                        <a href="https://vk.com/rx4dofficial" target="_blank" className="underline">RX4D VK</a>
                    </h4>
                </div>

                <div className="text-gray-400 text-sm text-center">
                    <h3>
                        Made by <a href="https://vk.com/color_kat" target="_blank" className="underline">@ColorKat</a>
                    </h3>
                    <h4>
                        powered by <a href="https://colorbit.ru" target="_blank" className="underline">Colorbit.ru</a>
                    </h4>
                </div>

            </div>
        </footer>
    );
}

export default memo(Footer);

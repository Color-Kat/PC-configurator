import React, {memo} from 'react';

const Footer: React.FC = () => {


    return (
        <footer className="flex justify-center bg-app-dark shadow-xl pb-5 pt-6 font-play">
            <div className="container px-5 flex-row md:flex-row flex justify-between gap-5">

                <div className="text-gray-400 flex-1">

                    Удобный инструмент для быстрого создания компьютерных сборок. Здесь вы можете сохранить список
                    ссылок на железо из разных магазинов и поделиться этой сборкой с другими с помощью одной маленькой
                    ссылки.

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
        </footer>
    );
}

export default memo(Footer);

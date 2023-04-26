import React, {memo} from 'react';

const Footer: React.FC = () => {


    return (
        <footer className="flex justify-center bg-app-dark shadow-xl pb-5 pt-6 font-play">
            <div className="container px-5 flex-col md:flex-row flex justify-between">

                <p className="text-gray-400">

                    Удобный инструмент для быстрого создания компьютерных сборок. Здесь вы можете сохранить список
                    ссылок на железо из разных магазинов и поделиться этой сборкой с другими с помощью одной маленькой
                    ссылки.

                </p>

            </div>
        </footer>
    );
}

export default memo(Footer);

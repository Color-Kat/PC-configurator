import pomelo1 from "@assets/Banners/pomelo1.png";
import pomelo2 from "@assets/Banners/pomelo2.png";
import pomelo3 from "@assets/Banners/pomelo3.png";
import pomelo4 from "@assets/Banners/pomelo4.png";
import pomelo5 from "@assets/Banners/pomelo5.png";
import { memo, useEffect, useState } from "react";

export const AsideAd3 = memo(() => {
    const images = [pomelo1, pomelo2, pomelo3, pomelo4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setIsFading(false);
            }, 500);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const goToPomelo = () => {
        window.open('https://pomelo.colorbit.ru?utm_source=rx4d', '_blank')
    }

    return (
        <>
            <div
                className="lg:block hidden overflow-hidden bg-white bg-opacity-75 rounded-xl shadow-lg p-4 mb-4 flex flex-col justify-between"
                style={{ textWrap: 'pretty' }}
            >
                <div
                    className="cursor-pointer flex lg:flex-col sm:flex-row flex-col items-center gap-4"
                    onClick={goToPomelo}
                >

                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold text-center text-app-dark leading-tight">
                            Приложение для анализа состава продуктов
                        </h2>

                        <p className="text-app-dark mt-2 text-center text-sm text-pretty">
                            Фотографируйте продукты и получайте детальные отчёты о их пользе и вредности!
                        </p>
                    </div>

                    <div
                        className="relative w-full overflow-hidden rounded-lg aspect-video sm:aspect-auto sm:h-48 lg:h-auto lg:aspect-square"
                        style={{ background: "#69a93f" }}>
                        <img
                            src={images[currentIndex]}
                            alt="Pomelo - приложение для анализа состава продуктов по фото. Не экономьте на здоровье - выбирайте качественные продукты с Pomelo!"
                            className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        />
                    </div>
                </div>
            </div>

            <a
                href="https://pomelo.colorbit.ru?utm_source=cash_visualizer"
                target="_blank"
                className="lg:hidden block"
            >
                <div
                    className="rounded-2xl p-5 shadow-2xl text-white max-w-max w-full flex flex-col gap-2"
                    style={{background: '#69a93f'}}
                >
                    <div>
                        <h2 className="text-3xl font-bold">
                            Инвестируйте в своё здоровье
                        </h2>
                        <h3 className="text-lg font-medium mt-0.5">
                            выбирайте качественные продукты с Pomelo!
                        </h3>
                    </div>

                    <div className="  bg-white p-2 rounded-xl mt-4">
                        <div className="w-full overflow-x-auto flex gap-2 rounded-lg">
                            {[
                                pomelo1,
                                pomelo2,
                                pomelo3,
                                pomelo4,
                                pomelo5,
                            ].map(screenshot => (
                                <img
                                    key={screenshot}
                                    src={screenshot}
                                    alt="Pomelo - приложение для анализа состава продуктов по фото. Не экономьте на здоровье - выбирайте качественные продукты с Pomelo!"
                                    className="md:w-64 w-48 rounded-lg shadow-lg"
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className="md:max-w-64 w-full ml-auto mt-4 text-black bg-white rounded-xl px-5 py-3 text-sm font-medium text-zinc-900 flex items-center justify-center shadow-lg hover:bg-gray-200 duration-150 cursor-pointer"
                    >
                        Сканировать
                    </div>
                </div>
            </a>

        </>
    );
});
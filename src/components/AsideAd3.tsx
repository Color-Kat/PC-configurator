import pomelo1 from "@assets/Banners/pomelo1.png";
import pomelo2 from "@assets/Banners/pomelo2.png";
import pomelo3 from "@assets/Banners/pomelo3.png";
import pomelo4 from "@assets/Banners/pomelo4.png";
import { memo, useState, useEffect } from "react";

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
        <div
            className="overflow-hidden bg-white bg-opacity-75 rounded-xl shadow-lg p-4 mb-4 flex flex-col justify-between"
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

                <div className="relative w-full overflow-hidden rounded-lg aspect-video sm:aspect-auto sm:h-48 lg:h-auto lg:aspect-square" style={{background: "#69a93f"}}>
                     <img
                        src={images[currentIndex]}
                        alt="Pomelo - Приложение для анализа состава продуктов"
                        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>
            </div>
        </div>
    );
});
import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { Section } from "@UI/sections/Section";
import { partTypes, PCItemData } from "./configuratorTypes";
import { defaultPCItemData, PCConfig, PCConfigI } from "./PCConfig";
import { shortURL } from "@/utils/shortURL"; // Imported from utils
import { copyToClipboard } from "@/utils/copyToClipboard.ts";
import toast from 'react-hot-toast';

// --- INTERFACES ---
interface PCItemInterface {
    type: keyof typeof partTypes;
    data: PCConfigI;
    changeDataByType: (type: keyof typeof partTypes, data: Partial<PCItemData>) => void;
}

interface AppMessage {
    title: string;
    description: string;
    type: 'error' | 'warning' | 'success';
}

// --- PC PART COMPONENT ---
const PCItem: React.FC<PCItemInterface> = ({ type, data, changeDataByType }) => {
    const itemData = data[type];

    const changeFormHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name as keyof PCItemData;
        const value = e.target.value;

        // Set the long URL immediately so it doesn't disappear if shortener fails
        changeDataByType(type, { [key]: value });

        // Auto-shorten link on paste
        if (
            key === 'link' &&
            !value.includes('clck.ru') &&
            value.includes('http') &&
            value.length > "http://clck.ru".length
        ) {
            try {
                const shortened = await shortURL(value);
                if (shortened) {
                    changeDataByType(type, { [key]: shortened });
                } else {
                    toast.error('Сокращение ссылок не работает из-за AdBlock');
                }
            } catch (error) {
                console.error(error);
                toast.error('Сокращение ссылок не работает из-за AdBlock');
            }
        }
    };

    const increaseQuantity = () => changeDataByType(type, { quantity: +itemData.quantity + 1 });
    const decreaseQuantity = () => {
        if (itemData.quantity > 1) {
            changeDataByType(type, { quantity: +itemData.quantity - 1 });
        }
    };

    const followLink = useCallback(() => {
        if (itemData.link) window.open(itemData.link, '_blank')?.focus();
    }, [itemData.link]);

    return (
        <div className="w-full md:px-3 sm:px-1.5 py-4 grid md:grid-cols-5 gap-4">
            <div className="col-span-1 flex justify-center items-center cursor-pointer">
                <h3
                    className="text-gray-800 hover:text-gray-600 font-roboto font-medium text-xl text-center"
                    onClick={followLink}
                    title={itemData.link ? "Посмотреть в магазине" : ""}
                >
                    {partTypes[type].title}
                </h3>
            </div>

            <div className="flex md:flex-col flex-col-reverse md:col-span-3 gap-2 md:gap-0 items-center">
                <div className="md:grid md:grid-cols-3 gap-2 w-full flex flex-col-reverse">
                    <input
                        className="md:col-span-2 md:h-10 h-14 px-3 md:py-1 py-2.5 md:mb-1 rounded-xl text-app-dark flex flex-1 shadow bg-app bg-opacity-75 outline-none md:text-left text-center placeholder-gray-600"
                        type="text"
                        placeholder="Название товара"
                        autoComplete="off"
                        name="title"
                        value={itemData.title.replaceAll('+', ' ')}
                        onChange={changeFormHandler}
                        title={type === "CPU" && /intel|интел|штеуд/i.test(itemData.title) ? "Лучше купи Ryzen" : ""}
                    />

                    <input
                        className="md:col-span-1 md:h-10 h-14 px-3 py-1 md:mb-1 rounded-xl text-app-dark text-center shadow bg-app bg-opacity-75 outline-none placeholder-gray-600"
                        type="number"
                        placeholder="Цена"
                        name="price"
                        autoComplete="off"
                        value={itemData.price || ''}
                        onChange={changeFormHandler}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-2 w-full items-center">
                    <input
                        type="text"
                        className="md:col-span-2 h-14 px-3 rounded-xl flex shadow bg-app bg-opacity-75 outline-none flex-1 md:text-left text-center placeholder-gray-600"
                        placeholder="Ссылка на товар"
                        autoComplete="off"
                        value={itemData.link}
                        name="link"
                        onChange={changeFormHandler}
                    />

                    <div className="md:col-span-1 h-14 px-3 py-1 rounded-xl flex shadow bg-app bg-opacity-75 items-center">
                        <button className="font-play font-bold text-3xl ml-2 mr-4 text-app-dark hover:text-gray-400" onClick={decreaseQuantity}>-</button>
                        <input
                            type="number"
                            className="text-center bg-transparent outline-none flex-1 min-w-0 placeholder-gray-500"
                            style={{ maxWidth: '50px', margin: 'auto' }}
                            placeholder="Кол-во"
                            autoComplete="off"
                            min="1"
                            value={itemData.quantity}
                            name="quantity"
                            onChange={changeFormHandler}
                        />
                        <button className="font-play font-bold text-3xl mr-2 ml-4 text-app-dark hover:text-gray-500" onClick={increaseQuantity}>+</button>
                    </div>
                </div>
            </div>

            <div className="md:col-span-1 flex justify-end items-end px-3 py-2 rounded-xl shadow bg-app-dark text-app-t font-bold text-3xl font-play">
                {itemData.quantity * itemData.price} ₽
            </div>
        </div>
    );
};

// --- URL PARSING UTILITY ---
const getPCConfigFromURL = (): Partial<PCConfigI> => {
    if (typeof window === 'undefined') return {}; // SSR protection

    const data: any = {};
    window.location.search
        .slice(1)
        .split("&")
        .forEach(item => {
            if (!item) return;
            const [type, field, value] = decodeURIComponent(item).split(/@|=/);
            if (!type || !field) return;

            if (!data[type]) {
                data[type] = { ...defaultPCItemData };
            }
            data[type][field] = value;
        });

    return data;
};

// --- MAIN COMPONENT ---
const Configurator: React.FC = () => {
    const [data, setData] = useState<PCConfigI>(new PCConfig());
    const [hasCopied, setHasCopied] = useState(false);
    const [alertMessage, setAlertMessage] = useState<AppMessage | null>(null);

    useEffect(() => {
        setData(new PCConfig(getPCConfigFromURL()));
    }, []);

    const changeDataByType = useCallback((type: keyof typeof partTypes, newData: Partial<PCItemData>) => {
        setData(prev => ({
            ...prev,
            [type]: { ...prev[type], ...newData }
        }));
    }, []);

    const totalPrice: number = useMemo(() => {
        return Object.values(data).reduce(
            (sum, item) => sum + (item.quantity * item.price), 0
        );
    }, [data]);

    const copyLink = useCallback(async () => {
        setAlertMessage(null); // Clear previous messages
        const longURL = new URL(window.location.href);

        Object.entries(data).forEach(([type, itemData]) => {
            if (!itemData) return;
            Object.entries(itemData).forEach(([key, value]) => {
                if (value) longURL.searchParams.append(`${type}@${key}`, String(value));
            });
        });

        try {
            const shortLink = await shortURL(longURL.href);

            if (shortLink) {
                copyToClipboard(shortLink);
            } else {
                // Shortener failed (AdBlock or other issue)
                copyToClipboard(longURL.href);
                toast.error('Сокращение ссылок не работает из-за AdBlock');
                setAlertMessage({
                    title: "Скопирована длинная ссылка",
                    description: "Не удалось сократить ссылку, потому что сокращатель ссылок заблокирован вашим адблоком, но мы скопировали длинную ссылку.",
                    type: "warning"
                });
            }
        } catch (error) {
            console.error(error);
            copyToClipboard(longURL.href);
            toast.error('Сокращение ссылок не работает из-за AdBlock');
            setAlertMessage({
                title: "Скопирована длинная ссылка",
                description: "Не удалось сократить ссылку, потому что сокращатель ссылок заблокирован вашим адблоком, но мы скопировали длинную ссылку.",
                type: "warning"
            });
        }

        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    }, [data]);

    // Array of PC parts for rendering
    const pcParts = Object.keys(partTypes) as Array<keyof typeof partTypes>;

    return (
        <div>
            <Section className="md:px-6 py-6">
                <h1 className="text-3xl font-bowler">Собрать ПК</h1>
                <p className="text-app-dark mt-1.5">
                    Вставьте ссылки на комплектующие в соответствующие поля и скопируйте ссылку, чтобы поделиться вашей сборкой.
                </p>

                <div className="space-y-2 mt-7">
                    {pcParts.map(type => (
                        <PCItem
                            key={type}
                            type={type}
                            data={data}
                            changeDataByType={changeDataByType}
                        />
                    ))}
                </div>

                <div className="flex justify-between md:flex-row flex-col-reverse gap-5 items-center mt-7 pt-7 border-t border-app-dark">
                    <button
                        className="py-2 px-3 rounded-lg font-bold text-xl text-app bg-gradient-to-r hover:to-gray-800 from-app-dark to-gray-600 text-center transition-all"
                        onClick={copyLink}
                    >
                        {hasCopied ? 'Скопировано ✓' : 'Скопировать ссылку'}
                    </button>

                    <div className="text-3xl font-bold font-sans text-right">
                        Итого: {totalPrice.toLocaleString('ru-RU')} ₽
                    </div>
                </div>

                {/* Beautiful UI block for final copy fallback */}
                {alertMessage && (
                    <div className={`mt-6 p-4 rounded-xl border-l-4 shadow-sm flex items-start gap-3 transition-all ${
                        alertMessage.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' :
                        alertMessage.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' :
                        'bg-green-50 border-green-500 text-green-800'
                    }`}>
                        <div>
                            <h3 className="font-bold text-lg">{alertMessage.title}</h3>
                            <p className="text-sm mt-1 whitespace-pre-wrap max-w-lg" style={{textWrap: 'pretty'}}>{alertMessage.description}</p>
                        </div>
                    </div>
                )}
            </Section>
        </div>
    );
};

export default memo(Configurator);
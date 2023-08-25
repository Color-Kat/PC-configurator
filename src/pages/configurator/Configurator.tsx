import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Section } from "@UI/sections/Section";
import { partTypes, PCItemData } from "./configuratorTypes";
import { defaultPCItemData, PCConfig, PCConfigI } from "./PCConfig";
import { shortURL } from "@/utils/shortURL";
import { copyToClipboard } from "@/utils/copyToClipboard.ts";


interface PCItemInterface {
    type: keyof typeof partTypes;
    data: PCConfigI;
    changeDataByType: (type: keyof typeof partTypes, data: any) => void;
}

const PCItem: React.FC<PCItemInterface> = ({type, data, changeDataByType}) => {

    /**
     * Change PC part key value by input name attribute
     * @param e
     */
    const changeFormHandler = async (e: any) => {
        const key = e.target.name;
        const value: string = e.target.value;

        changeDataByType(type, {
            [key]: value
        });

        // Change to short url
        if (
            key == 'link' && // Only for link field
            !value.includes('clck.ru') && // Don't short already short links
            value.includes('http') && // Make short only links
            value.length > "http://clck.ru".length // Minimum link length (so user can remove link by backspace)
        ) {
            changeDataByType(type, {
                [key]: await shortURL(value)
            });
        }
    };

    /**
     * Increase PC part quantity
     */
    const increaseQuantity = () => {
        changeDataByType(type, {
            quantity: +data[type].quantity + 1
        });
    };

    /**
     * Decrease PC part quantity
     */
    const decreaseQuantity = () => {
        if (data[type].quantity <= 1) return;

        changeDataByType(type, {
            quantity: +data[type].quantity - 1,
        });
    };

    /**
     * Open page by link of this PC part
     */
    const followLink = useCallback(() => {
        if (!data[type].link) return;
        window.open(data[type].link, '_blank').focus();
    }, [data]);

    return (
        <div className="w-full md:px-3 sm:px-1.5 py-4 grid md:grid-cols-5 gap-4">
            <div className="col-span-1 flex justify-center items-center cursor-pointer">
                <h3
                    className="text-gray-800 hover:text-gray-600 font-roboto font-medium text-xl text-center"
                    onClick={followLink}
                    title={data[type].link ? "Посмотреть в магазине" : ""}
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
                        value={data[type].title.replaceAll('+', ' ')}
                        onChange={changeFormHandler}
                        title={
                            type == "CPU" &&
                            /intel|интел|штеуд/i.test(data[type].title)
                                ? "Лучше купи Ryzen"
                                : ""
                        }
                    />

                    <input
                        className="md:col-span-1 md:h-10 h-14 px-3 py-1 md:mb-1 rounded-xl text-app-dark text-center shadow bg-app bg-opacity-75 outline-none placeholder-gray-600"
                        type="number"
                        placeholder="Цена"
                        name="price"
                        autoComplete="off"
                        value={data[type].price}
                        onChange={changeFormHandler}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-2 w-full items-center">
                    <input
                        type="text"
                        className="md:col-span-2 h-14 px-3 rounded-xl flex shadow bg-app bg-opacity-75 outline-none flex-1 md:text-left text-center placeholder-gray-600"
                        placeholder="Ссылка на товар"
                        autoComplete="off"
                        value={data[type].link}
                        name="link"
                        onChange={changeFormHandler}
                    />

                    <div
                        className="md:col-span-1 h-14 px-3 py-1 rounded-xl flex shadow bg-app bg-opacity-75 items-center">

                        <button
                            className="font-play font-bold text-3xl ml-2 mr-4 text-app-dark hover:text-gray-400"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>

                        <input
                            type="number"
                            className="text-center bg-transparent outline-none flex-1 min-w-0 placeholder-gray-500"
                            style={{maxWidth: '50px', margin: 'auto'}}
                            placeholder="Кол-во"
                            autoComplete="off" min="0"
                            value={data[type].quantity}
                            name="quantity"
                            onChange={changeFormHandler}
                        />

                        <button
                            className="font-play font-bold text-3xl mr-2 ml-4 text-app-dark hover:text-gray-500"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="md:col-span-1 flex justify-end items-end px-3 py-2 rounded-xl shadow bg-app-dark text-app-t bg-opacity- font-bold text-3xl font-play"
            >
                {data[type].quantity * data[type].price} ₽
            </div>

        </div>

    );
};

/**
 * Decode PCConfig data object from URL
 */
const getPCConfigFromURL: () => PCConfigI = () => {
    const data = {};

    location.search
        .slice(1)
        .split("&")
        .forEach(function (item) {
            const [type, field, value] = decodeURIComponent(item).split(/@|=/);

            if (!(type in data)) {
                data[type] = {...defaultPCItemData};
            }

            data[type][field] = value;
        });

    return data;
};

const Configurator: React.FC = () => {
    // Default config
    const [data, setData] = useState<PCConfigI>(new PCConfig());

    // Fill PCConfig by data from URL
    useEffect(() => {
        setData(new PCConfig(getPCConfigFromURL()));
    }, []);

    const changeDataByType = useCallback((type: keyof typeof partTypes, data) => {
        setData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                ...data
            }
        }));
    }, []);

    /**
     * Calculate total PC configuration price
     */
    const totalPrice: number = useMemo(() => {
        return +Object.values(data as any).reduce(
            (prev: number, PCItemData: PCItemData) => (prev + (PCItemData.quantity * PCItemData.price)),
            0
        );
    }, [data]);

    const [hasCopied, setHasCopied] = useState(false);
    const [error, setError] = useState('');

    /**
     * Generate link with PCConfig data,
     * short this link by yandex clck.ru
     * and copy to clipboard.
     */
    const copyLink = useCallback(async () => {
        setError('');

        let longURL = new URL((window.location as any).href);

        // Save all PCConfig data to link
        Object.keys(data).forEach(type => {
            if (!data[type]) return;

            Object.keys(data[type]).forEach(key => {
                if (!data[type][key]) return;
                longURL.searchParams.append(
                    type + '@' + key,
                    data[type][key]
                );
            });
        });

        const shortLink = await shortURL(longURL.href);

        if (shortLink)
            copyToClipboard(shortLink);
        else {
            copyToClipboard(longURL.href);
            setError("Слишком много данных для создания короткой ссылки.\nПопробуйте сократить некоторые ссылки и убрать кириллицу из названий.\nНо мы всё равно сохранили длинную ссылку в ваш буфер обмена.");
        }

        setHasCopied(true);

        setTimeout(() => setHasCopied(false), 1000);
    }, [data]);

    return (
        <div>
            <Section className="md:px-6 py-6">
                <h1 className="text-3xl font-bowler">Собрать ПК</h1>
                <p className="text-app-dark mt-1.5">
                    Вставьте ссылки на комплектующие в соответствующие поля и скопируйте ссылку, чтобы поделиться вашей
                    сборкой.
                </p>

                <div className="space-y-2 mt-7">
                    <PCItem type="GPU" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="CPU" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="motherboard" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="RAM" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="PSU" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="storage" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="coolingSystem" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="PCCase" data={data} changeDataByType={changeDataByType}/>
                    <PCItem type="fans" data={data} changeDataByType={changeDataByType}/>
                </div>

                <div
                    className="flex justify-between md:flex-row flex-col-reverse gap-5 items-center mt-7 pt-7 border-t border-app-dark">

                    <button
                        className="py-2 px-3 rounded-lg font-bold text-xl text-app bg-gradient-to-r hover:to-gray-800 from-app-dark to-gray-600 text-center"
                        onClick={copyLink}
                    >
                        {
                            hasCopied ? 'Скопировано' : 'Скопировать ссылку'
                        }
                    </button>

                    <div className="text-3xl font-bold font-sans text-right">Итого: {totalPrice} ₽</div>

                </div>

                {error &&
                    <p className="flex justify-between items-center mt-7 border-red-600 whitespace-pre-wrap text-red-500">
                        {error}
                    </p>}
            </Section>

            {/*<Section className="md:px-6 md:py-6">*/}
            {/*    <h1 className="text-3xl font-play text-app-dark">Есть вопросы по железу?</h1>*/}
            {/*    <p className="text-gray-700 mt-1.5 mb-5">Спросите RX4D лично через FanTalks и получите ответ в течение*/}
            {/*        всего нескольких часов!</p>*/}

            {/*    <a*/}
            {/*        type="button"*/}
            {/*        href="https://fantalks.io/r/rx4d_stream"*/}
            {/*        className="uppercase text-lg font-bold font-play tracking-wider text-gray-100 px-5 py-2 rounded-lg transition-colors bg-gradient-to-tl from-blue-400 to-indigo-400 hover:from-blue-500"*/}
            {/*        target="_blank"*/}
            {/*    >Задать вопрос</a>*/}
            {/*</Section>*/}
        </div>

    );
};

export default React.memo(Configurator);
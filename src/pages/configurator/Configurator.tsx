import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Section} from "@UI/sections/Section";
import {partTypes, PCItemData} from "./configuratorTypes";
import {defaultPCItemData, PCConfig, PCConfigI} from "./PCConfig";
import {shortURL} from "../../utils/shortURL";


interface PCItemInterface {
    type: keyof typeof partTypes;
    data: PCItemData[];
    changeDataByType: (type: keyof typeof partTypes, data: any) => void
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
    }

    /**
     * Increase PC part quantity
     */
    const increaseQuantity = () => {
        changeDataByType(type, {
            quantity: +data[type].quantity + 1
        });
    }

    /**
     * Decrease PC part quantity
     */
    const decreaseQuantity = () => {
        if (data[type].quantity <= 1) return;

        changeDataByType(type, {
            quantity: +data[type].quantity - 1,
        });
    }

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
                    className="text-gray-400 hover:text-gray-300 font-roboto font-medium text-xl"
                    onClick={followLink}
                >
                    {partTypes[type].title}
                </h3>
            </div>

            <div className="flex md:flex-col flex-col-reverse md:col-span-3 gap-2 md:gap-0 items-center">
                <div className="md:grid md:grid-cols-3 gap-2 w-full flex flex-col-reverse">
                    <input
                        className="md:col-span-2 md:h-10 h-14 px-3 md:py-1 py-2.5 md:mb-1 rounded-xl text-gray-300 flex flex-1 shadow bg-app outline-none md:text-left text-center"
                        type="text"
                        placeholder="Название товара"
                        autoComplete="off"
                        name="title"
                        value={data[type].title}
                        onChange={changeFormHandler}
                    />

                    <input
                        className="md:col-span-1 md:h-10 h-14 px-3 py-1 md:mb-1 rounded-xl text-gray-300 text-center shadow bg-app outline-none"
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
                        className="md:col-span-2 h-14 px-3 rounded-xl flex shadow bg-app outline-none flex-1 md:text-left text-center"
                        placeholder="Ссылка на товар"
                        autoComplete="off"
                        value={data[type].link}
                        name="link"
                        onChange={changeFormHandler}
                    />

                    <div className="md:col-span-1 h-14 px-3 py-1 rounded-xl flex shadow bg-app items-center flex">

                        <button
                            className="font-play font-bold text-3xl ml-2 mr-4 text-gray-400 hover:text-gray-300"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>

                        <input
                            type="number"
                            className="text-center bg-app outline-none shadow-inner flex-1 min-w-0"
                            style={{maxWidth: '50px', margin: 'auto'}}
                            placeholder="Кол-во"
                            autoComplete="off" min="0"
                            value={data[type].quantity}
                            name="quantity"
                            onChange={changeFormHandler}
                        />

                        <button
                            className="font-play font-bold text-3xl mr-2 ml-4 text-gray-400 hover:text-gray-300"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="md:col-span-1 flex justify-end items-end px-3 py-2 rounded-xl flex shadow bg-gray-800 font-bold text-3xl text-gray-400 font-play"
            >
                {data[type].quantity * data[type].price} ₽
            </div>

        </div>

    );
}

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
}

const Configurator: React.FC<{}> = ({}) => {
    // Default config
    const [data, setData] = useState<PCConfigI>(new PCConfig());

    // Fill PCConfig by data from URL
    useEffect(() => {
        setData(new PCConfig(getPCConfigFromURL()))
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
    const totalPrice = useMemo(() => {
        return Object.values(data as any).reduce(
            (prev, PCItemData) => (prev + (PCItemData.quantity * PCItemData.price)),
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
                )
            })
        });

        const shortLink = await shortURL(longURL.href);

        if (shortLink) navigator.clipboard.writeText(shortLink);
        else {
            setError("Слишком много данных для создания короткой ссылки.\nПопробуйте сократить некоторые ссылки и убрать кириллицу из названий.\nНо мы всё равно сохранили длинную ссылку в ваш буфер обмена.");
            navigator.clipboard.writeText(longURL.href);
        }

        setHasCopied(true);

        setTimeout(() => setHasCopied(false), 1000)
    }, [data]);

    return (
        <div>
            <Section className="md:px-6 py-6">
                <h1 className="text-3xl font-play">Конфигуратор ПК</h1>
                <p className="text-gray-400 mt-1.5">Вставьте ссылки на комплектующие в соответствующие поля</p>

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

                <div className="flex justify-between items-center mt-7 pt-7 border-t border-red-600">

                    <button
                        className="py-2 px-3 rounded-lg font-bold text-xl bg-gradient-to-r hover:from-red-600 from-red-500 to-red-800 text-center"
                        onClick={copyLink}
                    >
                        {
                            hasCopied ? 'Скопировано' : 'Скопировать ссылку'
                        }
                    </button>

                    <div className="text-3xl font-bold font-sans text-right">Итого: {totalPrice} ₽</div>

                </div>

                {error && <p className="flex justify-between items-center mt-7 border-red-600 whitespace-pre text-red-500">
                    {error}
                </p>}
            </Section>

            <Section>
                <h1 className="text-3xl font-play">Есть вопросы по железу?</h1>
                <p className="text-gray-400 mt-1.5 mb-5">Спросите RX4D лично через FanTalks и получите ответ в течение
                    всего нескольких часов!</p>

                <a
                    type="button"
                    href="https://fantalks.io/r/rx4d_stream"
                    className="uppercase text-lg font-bold font-play tracking-wider text-gray-200 px-5 py-2 rounded-lg transition-colors bg-gradient-to-tl from-blue-400 to-indigo-400 hover:from-blue-500"
                    target="_blank"
                >Задать вопрос</a>
            </Section>
        </div>

    );
}

export default React.memo(Configurator);
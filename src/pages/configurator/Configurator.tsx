import React, {useCallback, useMemo, useState} from 'react';
import {Section} from "@UI/sections/Section";
import {partTypes, PCItemData} from "./configuratorTypes";
import {PCConfig} from "./PCConfig";


interface PCItemInterface {
    type: keyof typeof partTypes;
    data: PCItemData[];
    changeDataByType: (type: keyof typeof partTypes, data: any) => void
}

const PCItem: React.FC<PCItemInterface> = ({type, data, changeDataByType}) => {

    const [link, setLink] = useState('');

    const changeFormHandler = (e: any) => {
        const key = e.target.name;
        const value = e.target.value;

        changeDataByType(type, {
            [key]: value
        });
    }

    const increaseQuantity = () => {
        changeDataByType(type, {
            quantity: +data[type].quantity + 1
        });
    }

    const decreaseQuantity = () => {
        if (data[type].quantity <= 1) return;

        changeDataByType(type, {
            quantity: +data[type].quantity - 1,
        });
    }

    return (
        <div className="w-full md:px-3 px-1.5 py-4 grid md:grid-cols-5 gap-4">
            <div className="col-span-1 flex justify-center items-center">
                <h3 className="text-gray-400 font-roboto font-medium text-xl">{partTypes[type].title}</h3>
            </div>

            <div className="flex md:flex-col flex-col-reverse md:col-span-3 gap-2 md:gap-0 items-center">
                <div className="md:grid md:grid-cols-3 gap-2 w-full flex flex-col-reverse">
                    <input
                        className="md:col-span-2 h-10 px-3 md:py-1 py-2.5 md:mb-1 rounded-xl text-gray-300 flex flex-1 shadow bg-app outline-none md:text-left text-center"
                        type="text"
                        placeholder="Название товара"
                        autoComplete="off"
                        name="title"
                        value={data[type].title}
                        onChange={changeFormHandler}
                    />

                    <input
                        className="md:col-span-1 h-10 px-3 py-1 md:mb-1 rounded-xl text-gray-300 text-center shadow bg-app outline-none"
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

const Configurator: React.FC<{}> = ({}) => {
    const [data, setData] = useState(new PCConfig());

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

    return (
        <Section className="px-6 py-6">

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
                <PCItem type="PC_case" data={data} changeDataByType={changeDataByType}/>
                <PCItem type="fans" data={data} changeDataByType={changeDataByType}/>
            </div>

            <div className="mt-7 pt-7 border-t border-red-600">

                <div className="text-3xl font-bold font-sans text-right">Итого: {totalPrice} ₽</div>

            </div>

        </Section>

    );
}

export default React.memo(Configurator);
import React, {useState} from 'react';
import {Section} from "@UI/sections/Section";
import {partTypes, PCItemData} from "./configuratorTypes";
import {PCConfig} from "./PCConfig";


interface PCItemInterface {
    type: keyof typeof partTypes;
    defaultLink: string;
    data: PCItemData[];
    changeDataByType: (type: keyof typeof partTypes, data: any) => void
}

const PCItem: React.FC<PCItemInterface> = ({type, defaultLink, data, changeDataByType}) => {

    const [link, setLink] = useState('');


    // const changeLinkHandler = async (e: any) => {
    //     setLink(e.target.value);
    // }

    const changeFormHandler = (e: any) => {
        const key = e.targer.name;
        const value = e.targer.value;

        changeDataByType(type, {
            [key]: value
        });
    }

    return (
        <div className="w-full md:px-3 px-1.5 py-4 grid grid-cols-5 gap-4">
            <div className="col-span-1 flex justify-center items-center">
                <h3 className="text-gray-400 font-roboto font-medium text-xl">{partTypes[type].title}</h3>
            </div>

            <div className="flex flex-col col-span-3 items-center">

                <input
                    className="h-10 px-3 py-1 mb-1 rounded-xl text-gray-300 flex shadow bg-app items-center w-full"
                    type="text"
                    placeholder="Название товара"
                    value={data[type].title}
                    onChange={changeFormHandler}
                />

                <div className="flex flex-row gap-2 w-full items-center">

                    <input
                        type="text"
                        className="h-14 px-3 rounded-xl flex shadow bg-app outline-none flex-1"
                        placeholder="Ссылка на товар"
                        value={data[type].link}
                        name="link"
                        onChange={changeFormHandler}
                    />

                    <div className="h-14 px-3 py-1 rounded-xl flex shadow bg-app items-center">

                        <button
                            className="font-play font-bold text-3xl ml-2 mr-4 text-gray-400 hover:text-gray-300"
                        >
                            -
                        </button>

                        <input
                            type="integer"
                            className="text-center bg-app outline-none shadow-inner"
                            placeholder="Кол-во"
                            autoComplete="off" min="0"
                            value="1"
                        />

                        <button
                            className="font-play font-bold text-3xl mr-2 ml-4 text-gray-400 hover:text-gray-300"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="col-span-1 flex justify-end items-end px-3 py-2 rounded-xl flex shadow bg-gray-800 font-bold text-3xl text-gray-400 font-play">
                122 ₽
            </div>

        </div>

    );
}

const Configurator: React.FC<{}> = ({}) => {
    const [links, setLinks] = useState({
        GPU: '123',
        CPU: '123',
        motherboard: {}
    });

    const [data, setData] = useState(new PCConfig());

    const changeDataByType = (type: keyof typeof partTypes, data) => {
        setData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                ...data
            }
        }));
    }

    console.log(data);

    return (
        <Section className="px-6 py-6">

            <h1 className="text-3xl font-play">Конфигуратор ПК</h1>
            <p className="text-gray-400 mt-1.5">Вставьте ссылки на комплектующие в соответствующие поля</p>

            <div className="space-y-2 mt-7">
                <PCItem type="GPU" defaultLink={links['GPU']} data={data} changeDataByType={changeDataByType}/>
                <PCItem type="CPU" defaultLink={links['CPU']} data={data} changeDataByType={changeDataByType}/>
                <PCItem type="motherboard" defaultLink={links['CPU']} data={data} changeDataByType={changeDataByType}/>
            </div>

        </Section>

    );
}

export default React.memo(Configurator);
export const partTypes = {
    GPU: {
        title: 'Видеокарта',
        image: ''
    },
    CPU: {
        title: 'Процессор',
        image: ''
    },
    motherboard: {
        title: 'Материнская плата',
        image: ''
    },
    RAM: {
        title: 'Оперативная память',
        image: ''
    },
    PSU: {
        title: 'Блок питания',
        image: ''
    },
    storage: {
        title: 'Хранение данных',
        image: ''
    },
    coolingSystem: {
        title: 'Охлаждение ЦП',
        image: ''
    },
    PCCase: {
        title: 'Корпус',
        image: ''
    },
    fans: {
        title: 'Вентиляторы',
        image: ''
    },
}

export interface PCItemData {
    title: string;
    link: string;
    price: number;
    quantity: number;
}

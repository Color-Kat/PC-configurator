import {partTypes, PCItemData} from "./configuratorTypes";

const defaultPCItemData: PCItemData = {
    title: '',
    link: '',
    quantity: 1,
    price: 0
}

interface PCConfigI {
    GPU?: PCItemData;
    CPU?: PCItemData;
    motherboard?: PCItemData;
    RAM?: PCItemData;
    PSU?: PCItemData;
    storage?: PCItemData;
    coolingSystem?: PCItemData;
    PC_case?: PCItemData;
    fans?: PCItemData;
}

export class PCConfig implements PCConfigI{

    public GPU = defaultPCItemData;
    public CPU = defaultPCItemData;
    public motherboard = defaultPCItemData;
    public RAM = defaultPCItemData;
    public PSU = defaultPCItemData;
    public storage = defaultPCItemData;
    public coolingSystem = defaultPCItemData;
    public PC_case = defaultPCItemData;
    public fans = defaultPCItemData;

    constructor(
        data: PCConfigI
    ) {
        // noinspection TypeScriptValidateTypes
        Object.assign(this, data);
    }
}
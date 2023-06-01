import {PCItemData} from "./configuratorTypes";

export const defaultPCItemData: PCItemData = {
    title: '',
    link: '',
    quantity: 1,
    price: 0
}

export interface PCConfigI {
    GPU?: PCItemData;
    CPU?: PCItemData;
    motherboard?: PCItemData;
    RAM?: PCItemData;
    PSU?: PCItemData;
    storage?: PCItemData;
    coolingSystem?: PCItemData;
    PCCase?: PCItemData;
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
    public PCCase = defaultPCItemData;
    public fans = defaultPCItemData;

    constructor(
        data?: PCConfigI
    ) {
        if(data)
            // noinspection TypeScriptValidateTypes
            Object.assign(this, data);
    }
}
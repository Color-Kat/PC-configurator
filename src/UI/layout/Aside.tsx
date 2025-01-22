import { AsideAd1 } from "@/components/AsideAd1";
import { AsideAd2 } from "@/components/AsideAd2";
import { memo } from "react";

export const Aside = memo(() => {


    return (
        <aside
            className="h-max lg:w-[300px] lg:mr-4 flex flex-col"
            style={{ height: "max-content" }}
        >

            <AsideAd1 />

            <AsideAd2 />

        </aside>
    );
});
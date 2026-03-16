import { AsideAd2 } from "@components/AsideAd2.tsx";
import { AsideAd1 } from "@components/AsideAd1.tsx";
import { AsideAd3 } from "@components/AsideAd3.tsx";
import { memo } from "react";

export const Aside = memo(() => {


    return (
        <aside
            className="h-max lg:w-[300px] lg:mr-4 flex flex-col"
            style={{ height: "max-content" }}
        >

            <AsideAd1 />

            <AsideAd2 />

            <AsideAd3 />

        </aside>
    );
});
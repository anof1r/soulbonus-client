import {
    useMemo
} from "react";

export const useSerched = (list, query) => {
    const serchedList = useMemo({
        // list.filter()
    }, [query])
}
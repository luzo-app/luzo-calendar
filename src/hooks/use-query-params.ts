import * as React from "react"
import {
    useLocation,
    useSearchParams
} from "react-router";

export function useQueryParams() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [allQueryParams, setAllQueryParams] = React.useState(Object.fromEntries(searchParams));

    React.useEffect(() => {
        setAllQueryParams(Object.fromEntries(searchParams));
    }, [searchParams]);

    const getQueryParamByKey = (key: string) => {
        const params = new URLSearchParams(location.search);
        return params.get(key) || "";
    };

    const setQueryParam = (key: string, value: string) => {
        const params = new URLSearchParams(location.search);
        params.set(key, value.toString());
        setSearchParams(params.toString());
    };

    const removeQueryParamByKey = (key: string) => {
        const params = new URLSearchParams(location.search);
        params.delete(key);
        setSearchParams(params.toString());
    };

    return {
        allQueryParams,
        getQueryParamByKey,
        setQueryParam,
        removeQueryParamByKey,
    };
}
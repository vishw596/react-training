import { useState, type ChangeEvent, type ReactNode } from "react";
import { FilterContext, type Option } from "./FilterContext";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL } from "../App";

export default function FilterProvider({ children }: { children: ReactNode }) {
    const [urlOptions, setUrlOptions] = useState<Option>({
        search: "",
        category: "",
        limit: 10,
        skip: 0,
        sortBy: "",
        order: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [input, setInput] = useState("");

    function handlePageUpdate(page: number) {
        setCurrentPage(page);
        setUrlOptions((prev) => ({ ...prev, skip: (page - 1) * prev.limit }));
    }
    function handleSearch() {
        setUrlOptions((prev) => ({
            ...prev,
            search: input,
            category: "",
        }));
        handlePageUpdate(1);
    }

    function handleSort(e: ChangeEvent<HTMLSelectElement>) {
        const [sortBy, order = ""] = e.target.value.split("-");
        setUrlOptions((prev) => ({
            ...prev,
            order: order,
            sortBy: sortBy,
        }));
        handlePageUpdate(1);
    }

    function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
        setUrlOptions((prev) => ({
            ...prev,
            category: e.target.value,
            search: ""
        }));
        setInput("");
        handlePageUpdate(1);
    }
    function onChangeHandlerInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "") {
            setUrlOptions((prev) => ({
                ...prev,
                category: "",
                search: "",
            }));
            handlePageUpdate(1);
        }
        setInput(e.target.value);
    }
    const { data: categoryList = [] } = useFetch<string[]>(`${BASE_URL}/category-list`);


    function getUrl() {
        const filtersUrl = Object.entries(urlOptions)
            .slice(2)
            .filter(([_, val]) => (typeof val === "string" ? val !== "" : val >= 0))
            .map((optionArr) => optionArr.join("="))
            .join("&");
        if (urlOptions.category) {
            return `${BASE_URL}/category/${urlOptions.category}?${filtersUrl}`;
        }
        if (urlOptions.search) {
            return `${BASE_URL}/search/?q=${urlOptions.search}&${filtersUrl}`;
        }
        return `${BASE_URL}?${filtersUrl}`;
    }


    
    return (
        <FilterContext.Provider
            value={{
                urlOptions,
                currentPage,
                input,
                handleCategory,
                handleSearch,
                handleSort,
                onChangeHandlerInput,
                categoryList,
                handlePageUpdate,
                getUrl
            }}>
            {children}
        </FilterContext.Provider>
    );
}

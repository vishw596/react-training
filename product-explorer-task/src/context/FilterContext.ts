import { createContext, type ChangeEvent } from "react";
export type Option = {
    search: string;
    category: string;
    limit: number;
    skip: number;
    sortBy: string;
    order: string;
};
export type FilterContextType = {
    urlOptions: Option;
    currentPage: number;
    input: string;
    handleSearch: () => void;
    handleSort: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
    onChangeHandlerInput: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePageUpdate: (page: number) => void;
    categoryList: string[];
    getUrl: () => string;
};
export const FilterContext = createContext<FilterContextType | undefined>(undefined);

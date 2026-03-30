import type { ChangeEvent } from "react";

export type OptionType = {
    value: string;
    optionTitle?: string;
}[];
type DropDownProps = {
    name:string;
    id:string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: OptionType;
    value: string;
    label: string;
};

export default function DropDown({ onChange, options, label, value,id,name }: DropDownProps) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <select name={name} id={id} onChange={onChange} value={value}>
                <option value=""></option>
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.optionTitle ?? option.value}
                        </option>
                    );
                })}
            </select>
        </>
    );
}

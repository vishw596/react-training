// 6. **Self-study hooks (useRef, useReducer)**
    
//     Add these to your assignment: build at least one small example using **useRef** (e.g. focus an input, or store a value that doesn’t need to trigger re-renders) and one using **useReducer** (e.g. a simple counter or form with multiple fields).

import { useEffect, useReducer, type ChangeEvent } from "react";
type FormStateType = {
    name: string;
    email: string;
    age: string;
    phone: string;
};
type Action =
    | {
          type: "update_field";
          name: string;
          value: string;
      }
    | {
          type: "form_submitted";
      };

// type ReducerFunctionType =
function reducer(state: FormStateType, action: Action) {
    if (action.type === "update_field") {
        return { ...state, [action.name]: action.value };
    } else {
        return {
            name: "",
            age: "",
            email: "",
            phone: "",
        };
    }
}
export default function UseReducerExample() {
    const [formState, setFormState] = useReducer(reducer, {
        name: "",
        age: "",
        email: "",
        phone: "",
    });
    useEffect(() => {
        console.log( formState);
    }, [formState]);
    return (
        <>
            <div>
                <form
                    onChange={(e: ChangeEvent) => {
                        const eventTarget = e.target as HTMLInputElement;
                        setFormState({
                            type: "update_field",
                            name: eventTarget.name,
                            value: eventTarget.value,
                        });
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        setFormState({ type: "form_submitted" });
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" value={formState.name} />
                    </div>
                    <div>
                        <label htmlFor="age">Age: </label>
                        <input type="number" name="age" id="age" value={formState.age} />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" value={formState.email} />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone: </label>
                        <input type="tel" name="phone" id="phone" value={formState.phone} />
                    </div>
                    <span>
                        <button type="submit">Submit</button>
                    </span>
                </form>
            </div>
        </>
    );
}

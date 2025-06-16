import { useState } from "react";

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const handlerInputChange = ({ target }) => {
        const { name, value } = target;
        setValues({ ...values, [name]: value })
    }

    const reset = () => {
        setValues(initialState);
    }

    return {
        handlerInputChange,
        reset,
        values
    }
}

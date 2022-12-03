import errors from "../../utils/errors.json";

import { BiError } from "react-icons/bi";

import "./InputError.scss";

export function InputError({type, field}: any) {
    return(
        // @ts-expect-error
        <div className="field-error"><div className="field-error-svg"><BiError/></div>{errors[field][type]}</div>
    );
};
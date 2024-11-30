import React from "react";

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
    props,
    ref
) {
    return <input ref={ref} {...props} />;
});

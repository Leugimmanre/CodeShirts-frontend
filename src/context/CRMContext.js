import { createContext, useState } from "react";

const CRMContext = createContext([{}, () => {}]);
const CRMProvider = props => {
    // Define initial state
    const [auth, setAuth] = useState({
        token: "",
        auth: false
    });

    return (
    <CRMContext.Provider value={[auth, setAuth]}>
        {props.children}
    </CRMContext.Provider>
    )
}

export {
    CRMContext,
    CRMProvider
}















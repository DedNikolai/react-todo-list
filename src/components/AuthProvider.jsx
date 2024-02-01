import React, {createContext, useMemo, useState} from "react";

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(true);
    const data = useMemo(() => {
        return {isAuth, setIsAuth};
    }, [isAuth])
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
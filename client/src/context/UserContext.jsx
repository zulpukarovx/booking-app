import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            const fetchUserInfo = async () => {
                const response = await fetch('http://localhost:4000/profile', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setUser(data);
                return data;
            }
            fetchUserInfo();
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            { children }
        </UserContext.Provider>
    );
}
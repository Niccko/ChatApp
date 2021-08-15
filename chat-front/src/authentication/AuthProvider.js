import {useEffect, useState} from "react";
import createTokenProvider from "./TokenProvider";

export function createAuthProvider(){
    let tokenProvider = createTokenProvider();
    function login(token){
        tokenProvider.setToken(token);
    }

    function logout(){
        tokenProvider.setToken(null);
    }

    async function authFetch(requestURL, requestOptions){
        let token = await tokenProvider.getToken();
        requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `Bearer ${token.accessToken}`
        };
        return fetch(requestURL, requestOptions);
    }

    function useAuth(){
        let [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn);

        useEffect(()=>{
            let listener = (newIsLogged)=>{
                setIsLogged(newIsLogged)
            }
            tokenProvider.subscribe(listener);
            return ()=> {
                tokenProvider.unsubscribe(listener)
            }
        }, [])
        return [isLogged];
    }

    return {
        login,
        logout,
        authFetch,
        useAuth
    }
}

export const {useAuth, authFetch, login, logout} = createAuthProvider();
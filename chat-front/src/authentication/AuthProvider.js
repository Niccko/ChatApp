import {useEffect, useState} from "react";
import createTokenProvider from "./TokenProvider";
import {createWebsocketProvider} from "../websockets/WebsocketProvider";

export function createAuthProvider() {
    let tokenProvider = createTokenProvider();

    function setUserData(data) {
        if (data) {
            localStorage.setItem("USER_DATA", JSON.stringify({login: data.login, roles: data.roles}))
        } else {
            localStorage.removeItem("USER_DATA")
        }
    }

    function login(data) {
        tokenProvider.setToken({accessToken: data.accessToken, refreshToken: data.refreshToken});
        setUserData(data);

    }

    function logout() {
        tokenProvider.setToken(null);
        setUserData(null);

    }

    async function authFetch(requestURL, requestOptions) {
        let token = await tokenProvider.getToken();
        if (!token)
            return null
        requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `Bearer ${token.accessToken}`
        };
        return fetch(requestURL, requestOptions);
    }

    function useAuth() {
        let [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn);

        useEffect(() => {
            let listener = (newIsLogged) => {
                setIsLogged(newIsLogged)
            }
            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener)
            }
        }, [])
        return [isLogged];
    }

    function getUserData() {
        return JSON.parse(localStorage.getItem("USER_DATA"));
    }

    return {
        login,
        logout,
        authFetch,
        useAuth,
        getUserData
    }
}

export const {useAuth, authFetch, login, logout, getUserData} = createAuthProvider();
function createTokenProvider() {
    let _token = JSON.parse(localStorage.getItem("JWT_TOKENS"))

    let observers = []

    function subscribe(observer){
        observers.push(observer);
    }

    function unsubscribe(observer){
        observers.filter(_observer => _observer !== observer);
    }

    function notify(){
        let logged = isLoggedIn();
        observers.forEach(observer => observer(logged))
    }

    function getExpirationDate(token) {
        if (!token) {
            return null;
        }
        let jwt = JSON.parse(atob(token.split(".")[1]));
        return (jwt && jwt.exp && jwt.exp * 1000) || null
    }

    function isExpired(exp) {
        if (!exp) {
            return false;
        }
        return Date.now() > exp;
    }

    async function getToken() {
        if (!_token) {
            return null;
        }
        if (isExpired(getExpirationDate(_token.accessToken))) {
            const new_token = await fetch('http://localhost:8075/refresh', {
                method: "POST",
                headers: {"x-refresh-token": _token.refreshToken},
            }).then(r => r.json())
            setToken(new_token);

        }
        return _token;
    }

    function isLoggedIn() {
        return !!_token;
    }

    function setToken(token) {
        if (token) {
            localStorage.setItem("JWT_TOKENS", JSON.stringify(token))
        } else {
            localStorage.removeItem("JWT_TOKENS");
        }
        _token = token;
        notify();
    }



    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe
    }
}

export default createTokenProvider;
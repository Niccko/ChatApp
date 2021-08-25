export function x_encode(data){
    let body = []
    for (let prop in data) {
        let key = encodeURIComponent(prop);
        let value = encodeURIComponent(data[prop])
        body.push(key + "=" + value);
    }
    return body.join('&').toString();
}

export const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export const getCookie = (cName) => {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

export const deleteCookie = (cname) => {
    let cookie = cname;
    cookie += "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = cookie;
}

export const deleteAllCookies = () => {
    let cookies = document.cookie.split("; ");

    cookies.forEach(cookie => {
        let cookieName = cookie.split("=")[0];
        deleteCookie(cookieName);
    });
};
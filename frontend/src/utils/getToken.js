import Cookies from 'js-cookie';

function getToken(name){
    const cookieExists = Cookies.get(name) !== undefined;
    if(cookieExists){
        return Cookies.get(name)
    }
    return null
}

export default getToken;
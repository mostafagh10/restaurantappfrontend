import Cookie from 'js-cookie'

export const setcookie = (key,value) => {
    Cookie.set(key , value , {expires : 1})
}

export const getcookie = (key) => {
    return Cookie.get(key)
}

export const deletecookie = (key) => {
    Cookie.remove(key)
}
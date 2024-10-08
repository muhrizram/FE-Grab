import Cookies from "js-cookie"

export const getUserToken = () => {
    return Cookies.get("access_token")
}
function getCookie(qualCookie, cookies) {
    console.log("Obtendo cookie " + qualCookie + " dos cookies: [" + cookies + "]");

    let cookieRetornar = []
    let listaDeCokies = cookies.split(";")
    for (const cookie of listaDeCokies) {
        let cookieData = cookie.split("=")

        let cookieKey = cookieData[0]
        let cookieValor = cookieData[1]
        if (cookieKey == qualCookie) {
            cookieRetornar = [cookieKey, cookieValor]
            break;
        }
    }
    return cookieRetornar;
}

module.exports = {
    getCookie
}
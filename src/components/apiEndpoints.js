// export const baseUrl = "http://localhost:3003/api/"
export const baseUrl = "https://1ab0978e3040.ngrok.io/api/"


const endPoints = {
    "UploadFile": baseUrl + "upload",

    "User": {
        "findUserName": baseUrl + "findusername",
        "register": baseUrl + "register",
        "logIn": baseUrl + "login"
    },
}



export default endPoints
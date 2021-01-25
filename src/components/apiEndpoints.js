export const baseUrl = "http://localhost:3003/api/"
// export const baseUrl = "https://210e0d0d97ed.ngrok.io/api/"


const endPoints = {
    "UploadFile": baseUrl + "upload",

    "User": {
        "findUserName": baseUrl + "findusername",
        "register": baseUrl + "register",
        "logIn": baseUrl + "login"
    },
    "Tags": {
        "createTags": baseUrl + "createtag",
        "fetchTags": baseUrl + "fetchtags"
    }
}



export default endPoints
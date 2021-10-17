/**
 * @param {string} username
 * @returns {string} key
 */
function getUserAvatarKey(username) {
    return `users.${username}.avatar`
}

/**
 * 存储头像
 * 
 * 参数为用户名，调用函数后会自动弹出文件选择窗口，用户选择文件后会自动存储
 * @param {string} username 
 */
export function storeAvatar(username, callback) {
    const inputElement = document.createElement("input")
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.addEventListener("change", () => {
        const file = inputElement.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const base64 = e.target.result
            try {
                localStorage.setItem(`users.${username}.avatar`, base64)
                callback(base64)
            } catch (error) {
                alert(`更换背景失败，可以检查图片文件大小是否过大。`)
                console.log(error)
            }
        }
        reader.readAsDataURL(file)
    })
    inputElement.click()
}

/**
 * 返回指定用户头像的src
 * ```
 * <img id="avatar" src=""/>
 * ```
 * ```
 * 
 * const avatarElement = document.querySelector("#avatar")
 * avatarElement.src = loadAvatar("username")
 * ```
 * @param {string} username 
 * @returns {string | null} src
 */
export function loadAvatar(username) {
    return localStorage.getItem(getUserAvatarKey(username))
}

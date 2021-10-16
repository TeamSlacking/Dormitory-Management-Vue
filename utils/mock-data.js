import { dormitories } from "./dormitories.js";

/**
 * 
 * @returns {{id: number; name: string; gender: 1 | 2; phone: string; dormitory: string; username: string;}[]}
 */
export function getDormitoryAdmin() {
    const admins = localStorage.getItem("dormitoryAdmin")
    if (admins) {
        return JSON.parse(admins)
    }

    let { people } = Mock.mock({
        "people|22": [{
            "id|+1": 1,
            name: "@cname",
            "gender|1": [1, 2],
            phone: "@integer(13000000000, 19999999999)",
            "dormitory|1": dormitories,
            username: "@word",
            password: "123"
        }, ],
    });
    people.forEach(person => person.phone = String(person.phone))
    saveDormitoryAdmin(people)  //存data进localStorage
    return people
}

export function saveDormitoryAdmin(data) {
    localStorage.setItem("dormitoryAdmin", JSON.stringify(data))
}

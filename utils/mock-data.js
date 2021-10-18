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
        },],
    });
    people.forEach(person => person.phone = String(person.phone))
    saveDormitoryAdmin(people)  //存data进localStorage
    return people
}

/**
 * 
 * @returns {{id: number; scode: number; sname: string; gender: 1 | 2; phone: string; dormitory: string; roomId: number;}[]}
 */

export function getStudentAdmin() {
    const student = localStorage.getItem("studentAdmin")
    if (student) {
        return JSON.parse(student)
    }

    let { people } = Mock.mock({
        "people|100": [{
            "id|+1": 1,
            scode: "@integer(20210010, 20219999)",
            sname: "@cname",
            "gender|1": [1, 2],
            phone: "@integer(13000000000, 19999999999)",
            "dormitory|1": dormitories,
            "roomId": /\d{3}/,
            password: "123",
            date: '@datetime("2021-MM-dd HH:mm")',
            beizhu: '@cparagraph(1)',
        },],
    });
    people.forEach(person => person.phone = String(person.phone))
    saveStudentAdmin(people)  //存data进localStorage
    return people
}

/** 
 * @returns {{id: number; name: string; bio: string; admin: string}[]}} 
*/
export function getDormitory() {
    const dormitory = localStorage.getItem("dormitory")
    if (dormitory) {
        return JSON.parse(dormitory)
    }

    const admins = getDormitoryAdmin()
    const data = dormitories.map((building, index) => ({
        id: index + 1,
        name: building,
        bio: `这里是${building}， 位于XXX`,
        admin: admins.filter((admin) => admin.dormitory === building)
            .map((admin) => admin.name)
            .join(" ")
    }))

    saveDormitory(data) 
    return data
}


export function saveDormitoryAdmin(data) {
    localStorage.setItem("dormitoryAdmin", JSON.stringify(data))
}

export function saveStudentAdmin(data) {
    localStorage.setItem("studentAdmin", JSON.stringify(data))
}

export function saveDormitory(data) {
    localStorage.setItem("dormitory", JSON.stringify(data))
}


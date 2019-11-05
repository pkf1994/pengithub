let obj1 = {
    grade: 1,
    name: {
        first: 'bob'
    },
    fuc(){
        return "abc"
    }
}


let objK = { ...obj1 }
let objJ = JSON.parse(JSON.stringify(obj1))



console.log(objK)
console.log(objJ)

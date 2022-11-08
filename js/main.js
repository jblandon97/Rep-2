//Validaciones
function isValidEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



let emailInput = document.getElementById("Email Address")
let word = "";
emailInput.addEventListener('input', (e) => {
    word += e.data
    console.log(word)

})

let valueEmail = word;

if (isValidEmail(valueEmail)) {
alert('Correo Válido')
}
else {
alert('Parece que esto no es un correo electrónico');
}

const createText = (_text) => {
    let _p = document.createElement("p")
    let _textNode = document.createTextNode(_text)
    _p.appendChild(_textNode)
    return _p
}

let thisForm = document.querySelector("#thisForm")

thisForm.addEventListener("submit", (e) => {

    let _res = localStorage.getItem("answers") // undefined // nullables  --> cuando por ejemplo el localstorage esta vacío

    let answers;

    if (_res == undefined) {
        answers = []
    } else {
        answers = JSON.parse(_res)
    }

    // let respuestas = !undefined ? [] : JSON.parse(_res) // ternary operator

    e.preventDefault()

    let newAnswer = {
        name: e.target.name.value,
        lastName: e.target.lastName.value,
        emailAddress: e.target.emailAddress.value,
        password: e.target.password.value
    }

    answers.push(newAnswer)

    let answersJSON = JSON.stringify(answers)

    localStorage.setItem("answers", answersJSON)

    //limpiar
    thisForm.reset()
    let main = document.querySelector("main")
    main.classList.toggle("hidden")
    showAnswers(newAnswer.name, newAnswer.lastName, newAnswer.emailAddress, newAnswer.password);
})



function showAnswers(name, lastName, emailAddress, password) {

    let answersJson = localStorage.getItem("answers")
    let answers = JSON.parse(answersJson)

    console.log(answers);

    let divs = document.createElement("div")
    divs.setAttribute("id", "outputs")
    let body = document.querySelector("body")
    body.appendChild(divs)

    answers.forEach(e => {

        let div = document.createElement("div")
        div.setAttribute("class", "output")

        name = createText("name: " + e.name)
        lastName = createText("lastName: " + e.lastName)
        emailAddress = createText("emailAddress: " + e.emailAddress)
        password = createText("password: " + e.password)

        div.appendChild(name)
        div.appendChild(lastName)
        div.appendChild(emailAddress)
        div.appendChild(password)
        div.appendChild(document.createElement("br"))
        // let body = document.querySelector("body")
        divs.appendChild(div)

    })

    let returnButton = document.createElement("button")
    returnButton.setAttribute("id", "return")
    let textReturnButton = document.createTextNode("Volver al formulario")
    returnButton.appendChild(textReturnButton)
    // let body = document.querySelector("body")
    body.appendChild(returnButton)

    returnButton.addEventListener("click", () => {
        let main = document.querySelector("main")
        divs.classList.toggle("hidden")
        main.classList.toggle("hidden")
        returnButton.classList.toggle("hidden")
    })

}






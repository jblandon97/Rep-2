
function isValidEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createText = (_text) => {
    let _p = document.createElement("p")
    let _textNode = document.createTextNode(_text)
    _p.appendChild(_textNode)
    return _p
}

let thisForm = document.querySelector("#thisForm")

thisForm.addEventListener("submit", (e) => {

    let emailInput = document.getElementById("Email Address");
    if (!isValidEmail(emailInput.value)) {
        alert('Parece lo que has escrito en el campo "Email Address" no es un correo electrónico.\
        \n\n*Una dirección de correo electrónico correcta debe tener esta estructura: name@host.tld.');
        emailInput.value = "";
        e.preventDefault();
        
    }
    else {
        let _res = localStorage.getItem("answers") 

        let answers;

        if (_res == undefined) {
            answers = []
        } else {
            answers = JSON.parse(_res)
        }
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

        thisForm.reset()
        let main = document.querySelector("main")
        main.classList.toggle("hidden")
        showAnswers(newAnswer.name, newAnswer.lastName, newAnswer.emailAddress, newAnswer.password);

    }
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
        divs.appendChild(div)

    })

    let title = document.createElement("h1")
    title.setAttribute("class", "title")
    title.innerText = "Lista de respuestas"
    body.appendChild(title)

    let returnButton = document.createElement("button")
    returnButton.setAttribute("id", "return")
    let textReturnButton = document.createTextNode("Volver al formulario")
    returnButton.appendChild(textReturnButton)
    body.appendChild(returnButton)

    returnButton.addEventListener("click", () => {
        let main = document.querySelector("main")
        divs.classList.toggle("hidden")
        main.classList.toggle("hidden")
        title.classList.toggle("hidden")
        returnButton.classList.toggle("hidden")
    })

}






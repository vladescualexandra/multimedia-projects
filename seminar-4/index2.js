

let persoane = [
    {
        nume: 'Ionescu',
        prenume: 'Maria',
        telefon: '012412421'
    },
    {
        nume: 'Popescu',
        prenume: 'Ion',
        telefon: '012412421'
    },
    {
        nume: 'Vasilescu',
        prenume: 'Ioana',
        telefon: '012412421'
    }
]

let afisare = () => {
    let tbody = document.querySelector('tbody');

    tbody.innerHTML = ''

    for (let p of persoane) {
        let rand = document.createElement('tr')
        tbody.append(rand)

        // let adaugarand = camp => {
        //     let celula = document.createElement('td')
        //     celula.innerText = p[camp]
        //     rand.append(celula)
        // }

        // adaugarand('nume')
        // adaugarand('prenume')
        // adaugarand('telefon')

        for (let i in p) {
            let celula = document.createElement('td')
            celula.innerText = p[i]
            rand.append(celula)
        }
    }
    let footer = document.querySelector('tfoot td')
    footer.innerText = `Numar persoane ${persoane.length}`


    console.log(persoane)
}



let adaugare = async () => {
    let nume = document.querySelector('#nume').value
    let prenume = document.querySelector('#prenume').value
    let telefon = document.querySelector('#telefon').value

    let persoana = {
        nume, prenume, telefon
    }

    persoane.push(persoana)

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persoana)
    })
    persoane = await response.json()
    afisare()

    afisare()
}

const url = 'http://ase.softmentor.ro/agenda'

let preluareDate = async () => {
    let response = await fetch(url)
    persoane = await response.json()
    afisare()
}

let aplicatie = () => {
    preluareDate()
    let buton = document.querySelector('#btnAdauga')
    buton.addEventListener('click', adaugare)


}


document.addEventListener('DOMContentLoaded', aplicatie)
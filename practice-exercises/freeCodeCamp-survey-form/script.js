function sendSurvey() {

    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let age = document.querySelector('#age').value;
    let role = document.querySelector('#role').value;
    
    let recommend = document.querySelectorAll('#recommend input');
    let rec = "";
    for (let i=0; i<recommend.length;i++) {
        if (recommend[i].checked) {
            rec = recommend[i].value;
            break;
        }
    }


    let improves = document.querySelectorAll('#improve input');
    let imp = "";
    for (let i=0; i<improves.length;i++) {
        if (improves[i].checked) {
            imp += improves[i].value + ", ";
        }
    }

    let favorite = document.querySelector('#favorite').value;
    let comment = document.querySelector('#comment').value;

    let results = document.createElement('div');
    results.innerText =  `
    Name: ${name}
    Email: ${email}
    Age: ${age}
    Role: ${role}
    Recommend: ${rec}
    Favorite: ${favorite}
    Improve: ${imp}
    Comment: ${comment}
    `


    results.style.backgroundColor = "black";
    results.style.color = "white";
    document.body.appendChild(results);


    

}


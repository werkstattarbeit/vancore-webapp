const prepareScoreForMail = () => {
    scoresToSend = []
    scores.forEach(value => {
        if (value != null) {
            scoresToSend.push(value)
        }
    })
    return scoresToSend
}

const updateMail = () => {
    coded = "QTNYWGc@UGW-iv1E1G.71"
    key = "wMcmK6grF7LXRCN5t3WnA2J0Eu8QvkspVOBey9bIGqfolZUzSYdTP4Ha1hxijD"
    shift=coded.length
    link=""
    for (i=0; i<coded.length; i++) {
        if (key.indexOf(coded.charAt(i))==-1) {
            ltr = coded.charAt(i)
            link += (ltr)
        }
        else {
            ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
            link += (key.charAt(ltr))
        }
    }
    let betreff = "?subject=free chocolate"
    let body = "\n" + "\n" + "\n" + "--------------------------------------------------------------"
        + "\n" + "My answers: " + prepareScoreForMail() + "\n" + "My score: " + calculateChanges()
    body = encodeURIComponent(body);

    // Only add if all questions are answered
    //if (!scores.includes(0)) {
        mailLink = document.getElementById('contact__mail-button');
        mailLink.innerHTML = "<a href='mailto:" + link + betreff + '&body=' + body + "'>Kontakt</a>";
    //}
}
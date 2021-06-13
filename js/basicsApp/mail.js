const prepareScoreForMail = () => {
    scoresToSend = []
    scores.forEach(value => {
        if (value != null) {
            scoresToSend.push(value)
        }
    })
    return scoresToSend
}

const printQuestionsWithAnswers = () => {
    scoresToPrint = prepareScoreForMail();
    questionAndAnswerText = "Baseline" + "\n" +
        "Ich habe die wesentlichen Stakeholder in meine Entscheidungsfindung einbezogen: " + "\t" + scoresToPrint[0] + "\n" +
        "Wir haben schonungslos unsere internen Stärken und Schwächen analysiert: " + "\t" + "\t" +  scoresToPrint[1] + "\n" +
        "Wir haben einen klaren Projektrahmen gesetzt: Zeit, Kosten, strategische Tabus: " + "\t" + scoresToPrint[2] + "\n" +
        "\n" +
        "Assumptions" + "\n" +
        "Wir verstehen die relevanten Trends in unseren Märkten und deren Auswirkungen auf unsere Kunden: " + "\t" + scoresToPrint[3] + "\n" +
        "Wir beobachten genau, wie unser direkter und indirekter Wettbewerb agiert: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[4] + "\n" +
        "Wir wissen, wer und was im Markt für uns von Bedeutung ist: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[5] + "\n" +
        "\n" +
        "Strategy" + "\n" +
        "Wir haben ein inspirierendes Leitbild, das die Geschichte unserer Firma für die nächsten 5 Jahre fortschreibt: " + "\t" + scoresToPrint[6] + "\n" +
        "Unser Leitbild ist konkretisiert durch messbare Ziele auf allen Ebenen des Unternehmens: " + "\t" + "\t" + "\t" + "\t" + scoresToPrint[7] + "\n" +
        "Wir wissen, wo unsere Stärken liegen und was uns vom Wettbewerb differenziert: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[8] + "\n" +
        "\n" +
        "Implications" + "\n" +
        "Wir haben die Fähigkeiten identifiziert und priorisiert, die wir aufbauen müssen, um unsere Ziele zu erreichen: " + "\t" + scoresToPrint[9] + "\n" +
        "Wir haben festgelegt, in welchen Märkten wir welche Produkte/Services verkaufen werden: " + "\t" + "\t" + "\t" + "\t" + scoresToPrint[10] + "\n" +
        "Wir haben eine Organisation gebaut, die an den zukünftigen Anforderungen ausgerichtet ist: " + "\t" + "\t" + "\t" + "\t" + scoresToPrint[11] + "\n" +
        "\n" +
        "Commitment" + "\n" +
        "Das Führungsteam steht geschlossen hinter der Strategie: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[12] + "\n" +
        "Wir haben den Gesellschaftern und anderen wichtigen Stakeholdern die Strategie erklärt und sie für unseren Plan begeistert: " + scoresToPrint[13] + "\n" +
        "Wir haben unseren Mitarbeitern die Strategie erklärt und sie für unseren Plan begeistert: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[14] + "\n" +
        "\n" +
        "Sustainability" + "\n" +
        "Wir überprüfen regelmäßig, ob wir uns in der Strategie das Richtige vorgenommen haben: " + "\t" + scoresToPrint[15] + "\n" +
        "Wir überprüfen regelmäßig, ob wir umsetzen, was wir uns vorgenommen haben: " + "\t" + "\t" + "\t" + scoresToPrint[16] + "\n" +
        "Wir arbeiten kontinuierlich daran, besser miteinander umzugehen und zusammenzuarbeiten: " + "\t" + scoresToPrint[17] + "\n";

        return questionAndAnswerText;
}

const updateMail = () => {
    /* Encryption script from https://dimentech.com/assets/obfuscator.html
    *  To change the email address please visit the above link and put
    *  in the desired address. Leave the "link text" free.
    *  Copy and replace only the lines of javascript that corresponds
    *  to the marked section below.
    * */
    coded = "d5WxjW@w5TjCuZ.xC" // first line to replce
    key = "rsnXDHYeJCaK0PiIbuWTF8cLZAR5vzGxSdq76yhjmBQlOw3VUN2k1Mof49ptEg"
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
    } // last line to replace
    let betreff = "?subject=Kontaktaufnahme"

    let body = "\n" + "\n" + "\n" +

        "--------------------------------------------------------------" + "\n" +
        "Mein Ergebnis" +
        "\n" +
        "\n" +
        printQuestionsWithAnswers() +
        /*"My answers lol: " + prepareScoreForMail() + "\n" +*/
        "\n" +
        "\n" +
        "Gesamtscore: " + calculateChanges();

    body = encodeURIComponent(body);

    // Only add if all questions are answered
    //if (!scores.includes(0)) {
        mailLink = document.getElementById('contact__mail-button');
        mailLink.innerHTML = "<a href='mailto:" + link + betreff + '&body=' + body + "'>Kontakt</a>";
    //}
}
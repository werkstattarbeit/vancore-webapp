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
        "I have involved the main stakeholders in my decision-making: " + "\t" + "\t" + "\t" + scoresToPrint[0] + "\n" +
        "We have relentlessly analyzed our internal strengths and weaknesses: " + "\t" + scoresToPrint[1] + "\n" +
        "We have set a clear project framework: time, costs, strategic taboos: " + "\t" + "\t" + scoresToPrint[2] + "\n" +
        "\n" +
        "Assumptions" + "\n" +
        "We understand the relevant trends in our markets and their effects on our customers: " + scoresToPrint[3] + "\n" +
        "We closely monitor how our direct and indirect competition acts: " + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[4] + "\n" +
        "We know who and what is important to us in our industry: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[5] + "\n" +
        "\n" +
        "Strategy" + "\n" +
        "We have an inspiring mission statement that will continue the story of our company for the next 5 years: " + "\t" + scoresToPrint[6] + "\n" +
        "Our mission statement is made concrete through measurable goals at all levels of the company: " + "\t" + "\t" + scoresToPrint[7] + "\n" +
        "We know where our strengths lie and what sets us apart from the competition: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[8] + "\n" +
        "\n" +
        "Implications" + "\n" +
        "We have identified and prioritized the skills that we need to build up in order to achieve our goals: " + "\t" + scoresToPrint[9] + "\n" +
        "We have determined in which markets we will sell which products / services: " + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[10] + "\n" +
        "We have built an organization that is geared towards future requirements: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[11] + "\n" +
        "\n" +
        "Commitment" + "\n" +
        "The management team stands united behind the strategy: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[12] + "\n" +
        "We explained the strategy to the shareholders and other important stakeholders and got them excited about our plan: " + "\t" + scoresToPrint[13] + "\n" +
        "We explained the strategy to our employees and got them excited about our plan: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[14] + "\n" +
        "\n" +
        "Sustainability" + "\n" +
        "We regularly check whether we have chosen the right strategy: " + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[15] + "\n" +
        "We regularly check whether we are implementing what we have set out to do: " + "\t" + "\t" + "\t" + "\t" + "\t" + scoresToPrint[16] + "\n" +
        "We are continuously putting effort into improving our collaboration on a work and personal level: " + "\t" + scoresToPrint[17] + "\n";

    return questionAndAnswerText;
}

const updateMail = () => {
    coded = "d5WxjW@w5TjCuZ.xC"
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
    }
    let betreff = "?subject=Contact"

    let body = "\n" + "\n" + "\n" +

        "--------------------------------------------------------------" + "\n" +
        "My result" +
        "\n" +
        "\n" +
        printQuestionsWithAnswers() +
        /*"My answers lol: " + prepareScoreForMail() + "\n" +*/
        "\n" +
        "\n" +
        "Score: " + calculateChanges();

    body = encodeURIComponent(body);

    // Only add if all questions are answered
    //if (!scores.includes(0)) {
    mailLink = document.getElementById('contact__mail-button');
    mailLink.innerHTML = "<a href='mailto:" + link + betreff + '&body=' + body + "'>Kontakt</a>";
    //}
}
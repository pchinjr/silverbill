
const obj ={};

$("#quoteForm").submit( function(event){
    alert("submit event" + document.forms[0]);
    const form = document.forms[0];
    for(const data of form) {
        obj[data.id] = data.value;
    };
    event.preventDefault();
    displayResults();
});

const displayResults = function() {
    let userScore = calcScore();
    let userRate = calcRate();

    const salesInt = parseInt(obj.salesVolume);
    const transactionsInt = parseInt(obj.numberTransactions);

    document.getElementById('#modal').innerHTML = `<p>Congratulations ${obj.firstName} You qualify for a nominal rate of ${userRate.nominal}% and you can expect to pay $${userRate.realDollar} a month for processing.</p>`;

    $('#myModal').modal();
}


const calcScore = function() {
    let score = 0;  

    if(obj.companyType === "Sole Proprietor"){
        score += 3;
    }

    if(obj.operatingYears === "Under A Year"){
        score += 6;
    } else if (obj.operatingYears === "1-3 years") {
        score += 3;
    } else {
        score += 0;
    }

    if(obj.seasonal === "Yes") {
        score += 8;
    }

    if(obj.deposits === "Yes") {
        score += 10;
    }

    if(obj.salesVolume <= 50000) {
        score += 0;
    } else if(obj.salesVolume >= 50001 && obj.salesVolume <= 300000) {
        score += 1;
    } else if(obj.salesVolume >= 300001 && obj.salesVolume <= 2000000) {
        score += 2;
    } else if (obj.salesVolume >= 2000001) {
        score +=3;
    }

    score = score / 5; //averages users score out of 5 questions

    return score;
}

const calcRate = function() {
    let bp = 0;
    let cent = 0;
    const score = calcScore();
    const scoreMultiplier = score * 0.0005;
    const salesInt = parseInt(obj.salesVolume);
    const batch = 6.75;
    const yearlyFee = 8.33;
    const oneYearFee = 5;
    const transInt = parseInt(obj.numberTransactions)
    const avgTicket = salesInt / transInt;
    
    if(salesInt < 5000) {
        bp = 0.0012;
    } else if(salesInt > 5001 && salesInt < 9000) {
        bp = 0.0012;
    } else if(salesInt > 9001 && salesInt < 23000) {
        bp = 0.0011;
    } else if(salesInt > 23001 && salesInt < 50000) {
        bp = 0.0010;
    } else if (salesInt > 50000) {
        bp = 0.0008;
    }

    if(salesInt < 5000) {
        cent = 0.12;
    } else if(salesInt > 5001 && salesInt < 9000) {
        cent = 0.12;
    } else if(salesInt > 9001 && salesInt < 23000) {
        cent = 0.10;
    } else if(salesInt > 23001 && salesInt < 50000) {
        cent = 0.10;
    } else if (salesInt > 50000) {
        cent = 0.08;
    }

    let adjustedBp = (salesInt * bp + salesInt * scoreMultiplier);
    let salesCents = transInt * cent;

    let markup = (adjustedBp + salesCents + batch + yearlyFee + oneYearFee) / salesInt;
    const mcv = 0.0165;
    const nominal = markup + mcv;
    const nominalFixed = ((markup + mcv) * 100).toFixed(2);
    const realDollar = salesInt * nominal;

    return { 
        realDollar: realDollar,
        nominal: nominalFixed 
    }

    //console.log(score, avgTicket, bp, adjustedBp, salesInt, scoreMultiplier, salesCents, transInt, markup, nominal, realDollar);

}




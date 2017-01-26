
const obj ={};

$("#quoteForm").submit(function(event){
    const form = document.forms[0];
    for(const data of form) {
        obj[data.id] = data.value;
    };
    event.preventDefault();
    calculate(obj);
});

// $("#submit").click(function(event){
//     event.preventDefault();
//     const form = document.forms[0];
//     for(const data of form) {
//         obj[data.id] = data.value;
//     };
//     console.log(obj);
// });


var calculate = function(obj) {
    let userScore = 0;  

    if(obj.companyType === "Sole Proprietor"){
        userScore += 3;
    }

    if(obj.operatingYears === "Under A Year"){
        userScore += 6;
    } else if (obj.operatingYears === "1-3 years") {
        userScore += 3;
    } else {
        userScore += 0;
    }

    if(obj.seasonal === "Yes") {
        userScore += 8;
    }

    if(obj.deposits === "Yes") {
        userScore += 10;
    }

    const salesInt = parseInt(obj.salesVolume);
    if(obj.salesVolume <= 50000) {
        userScore += 0;
    } else if(obj.salesVolume >= 50001 && obj.salesVolume <= 300000) {
        userScore += 1;
    } else if(obj.salesVolume >= 300001 && obj.salesVolume <= 2000000) {
        userScore += 2;
    } else if (obj.salesVolume >= 2000001) {
        userScore +=3;
    }

    const transactionsInt = parseInt(obj.numberTransactions);

    userScore = userScore / 5; //averages users score out of 5 questions

    document.getElementById('#modal').innerHTML = `Congratulations ${obj.firstName} Your Score is ${userScore} and your average sale is ${salesInt / transactionsInt}`;

    $('#myModal').modal();
}


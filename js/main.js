
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
    console.log(obj.numberTransactions);


    return 
}


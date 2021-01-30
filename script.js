// get input value text into number
function getInput(inputId) {
    let inputText = document.getElementById(inputId).value;
    if (inputText == '') {
        inputText = 0;
    }
    let inputNumber = parseInt(inputText);
    return inputNumber;
}


// get total and display total
function getTotal() {
    let data = {};
    const firstClassCount = getInput('first-class-count');
    const economyCount = getInput('economy-count');
    const firstClassTotal = firstClassCount * 150;
    const economyTotal = economyCount * 100;
    const subTotal = firstClassTotal + economyTotal;
    const tax = Math.round(subTotal * 0.1);
    const total = subTotal + tax;

    data.firstClassCount = firstClassCount;
    data.economyCount = economyCount;
    data.firstClassPrice = firstClassTotal;
    data.economyPrice = economyTotal;
    data.subTotal = subTotal;
    data.tax = tax;
    data.total = total;

    return data;
}


function clickHandlar(inputId, action) {
    let setInputValue;
    let inputValue = getInput(inputId);

    if (action == "plus") {
        setInputValue = inputValue + 1;
    } else {
        if (inputValue > 0) {
            setInputValue = inputValue - 1;
        } else {
            setInputValue = 0;
        }
    }

    document.getElementById(inputId).value = setInputValue;

    // get total and display values
    let data = getTotal();
    document.getElementById('sub-total').innerText = '$' + data.subTotal;
    document.getElementById('tax').innerText = '$' + data.tax;
    document.getElementById('total').innerText = '$' + data.total;
}

// first class handlar
document.getElementById('first-class-increase').addEventListener('click', function () { clickHandlar('first-class-count', 'plus') });

document.getElementById('first-class-decrease').addEventListener('click', function () { clickHandlar('first-class-count', 'minus') });

// economy handlar
document.getElementById('economy-increase').addEventListener('click', function () { clickHandlar('economy-count', 'plus') });

document.getElementById('economy-decrease').addEventListener('click', function () { clickHandlar('economy-count', 'minus') });


// onclick show with ticket info modal
document.getElementById('bookNow').addEventListener('click', function () {
    const ticketModal = new bootstrap.Modal(document.getElementById('ticketDetailsModal'));

    let data = getTotal();
    document.getElementById('first-class-quantity').innerText = data.firstClassCount;
    document.getElementById('first-class-price').innerText = '$' + data.firstClassPrice;


    document.getElementById('economy-quantity').innerText = data.economyCount;
    document.getElementById('economy-price').innerText = '$' + data.economyPrice;

    document.getElementById('modal-sub-total').innerText = '$' + data.subTotal;
    document.getElementById('modal-tax').innerText = '$' + data.tax;
    document.getElementById('modal-total').innerText = '$' + data.total;

    ticketModal.show();
});
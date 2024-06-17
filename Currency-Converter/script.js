const selectOptions = document.querySelectorAll(".select select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const submitbtn = document.querySelector(".submit button");
const exchangeicon = document.querySelector(".icon");

for (let i = 0; i < selectOptions.length; i++) {
    for (let currency_code in country_list) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if (i == 1) {
            selected = currency_code == "INR" ? "selected" : "";
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        selectOptions[i].insertAdjacentHTML("beforeend", optionTag);
    }

    selectOptions[i].addEventListener("change", e => {
        loadflag(e.target);
    });
}

function loadflag(element) {
    for (let code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/w20/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

submitbtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
})

exchangeicon.addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    loadflag(fromCurrency);
    loadflag(toCurrency);
    getExchangeRate();
});

function getExchangeRate() {
    const amt = document.querySelector(".input input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amtvalue = amt.value;
    if (amtvalue == "" || amtvalue == "0") {
        amt.value = "1";
        amtvalue = 1;
    }

    let API_URL = `https://v6.exchangerate-api.com/v6/d9c3ce72e88fd99e14aa018e/latest/${fromCurrency.value}`;
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amtvalue * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amtvalue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        }).catch(() => {
            exchangeRateTxt.innerText = "Something Went Wrong ...";
        })
}
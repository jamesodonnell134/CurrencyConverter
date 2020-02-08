    /* jshint -W097 */
    "use strict";

    function currModel() {

        let curr = {
        };

        window.addEventListener('load', function() {

            if(navigator.onLine) {
                console.log("Downloading live rates!");
                getRates();
            }

            else {
                alert("No network connection!\nUsing last saved rates.");
                console.log("Running offline mode!");
                curr['EUR'] = 1;
                curr['CZK'] = parseFloat(localStorage['CZK']);
                curr['NOK'] = parseFloat(localStorage['NOK']);
                curr['GBP'] = parseFloat(localStorage['GBP']);
                curr['PLN'] = parseFloat(localStorage['PLN']);
                curr['USD'] = parseFloat(localStorage['USD']);
                curr['DKK'] = parseFloat(localStorage['DKK']);
                curr['HUF'] = parseFloat(localStorage['HUF']);
                curr['RON'] = parseFloat(localStorage['RON']);
                curr['SEK'] = parseFloat(localStorage['SEK']);
                curr['CHF'] = parseFloat(localStorage['CHF']);
                curr['ISK'] = parseFloat(localStorage['ISK']);
                curr['HRK'] = parseFloat(localStorage['HRK']);
                curr['RUB'] = parseFloat(localStorage['RUB']);
                curr['TRY'] = parseFloat(localStorage['TRY']);
                curr['AUD'] = parseFloat(localStorage['AUD']);
                curr['BRL'] = parseFloat(localStorage['BRL']);
                curr['CAD'] = parseFloat(localStorage['CAD']);
                curr['CNY'] = parseFloat(localStorage['CNY']);
                curr['HKD'] = parseFloat(localStorage['HKD']);
                curr['IDR'] = parseFloat(localStorage['IDR']);
                curr['ILS'] = parseFloat(localStorage['ILS']);
                curr['INR'] = parseFloat(localStorage['INR']);
                curr['KRW'] = parseFloat(localStorage['KRW']);
                curr['MXN'] = parseFloat(localStorage['MKN']);
                curr['MYR'] = parseFloat(localStorage['MYR']);
                curr['MZD'] = parseFloat(localStorage['MZD']);
                curr['PHP'] = parseFloat(localStorage['PHP']);
                curr['SGD'] = parseFloat(localStorage['SGD']);
                curr['THB'] = parseFloat(localStorage['THB']);
                curr['ZAR'] = parseFloat(localStorage['ZAR']);
            }

        });

        function getRates() {

            let http, ratesJSON;
            http = new XMLHttpRequest();
            http.open("GET", "rates.php", true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.onreadystatechange = function () {
                if (http.readyState === 4 && http.status === 200) {
                    ratesJSON = http.responseText.split(",");
                    ratesJSON.pop();

                    // Loop to select every 2 element and group them together
                    // Using the currency as a key

                    for (let i = 0; i < ratesJSON.length; i++) {
                        let a = ratesJSON[i];
                        let b = parseFloat(ratesJSON[i+1]);
                        i++;
                        curr[a] = b;
                        localStorage[a] = b;
                    }

                    localStorage['EUR'] = 1;

                    let today = new Date();
                    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    let dateTime = date+' '+time;
                    localStorage['rates_updated'] = dateTime;
                };
            };
            http.send();
        };


        // Console.log will happen before XML request complete, so wait period must be given
        //setTimeout(function() { console.log(curr); }, 500);


        let final = 0;

        this.updateDisplay = function (e) {
            final = e;
            return final;
        };

        this.getDisp = function () {
            return final;
        };

        // Fed from view
        this.convertCurrency = function (h, a, f, am) {

            let result = 0;
            let from = a;
            let to = h;
            let fee = f;
            let amountInput = am;

            if(!isNaN(amountInput)){
                    fee = calculateFee(fee);
                    result = convert(amountInput, from, to, fee);
                    final = result + " " + to;
                    this.updateDisplay(final);
                }
        }

        // Self contained. Fed from convertCurrency
        function convert(amountInput, from, to, fee) {
            let bfee = fee;
            let awayRate = getRate(from);
            let homeRate = getRate(to);

            let result;

            try {
                if (from === to) {
                    result = amountInput;

                } else {
                    let res1 = (amountInput / awayRate);
                    let addedFee = ((res1) * homeRate) * bfee;
                    result = Math.round(((res1) * homeRate) + addedFee);
                    if (result == 0) {
                        result = "0";
                    }
                    // As assignment asks for whole numbers, if amount is less than 1, Math.round will round to 1 which is wrong
                    else if (result < 1) {
                        result = "<1";
                    }
                }
            } catch (err) {
                let res1 = (amountInput / awayRate);
                let addedFee = ((res1) * homeRate) * bfee;
                result = Math.round(((res1) * homeRate) + addedFee);

                if (result == 0) {
                    result = "0";
                }
                // As assignment asks for whole numbers, if amount is less than 1, Math.round will round to 1 which is wrong
                else if (result < 1) {
                    result = "<1";
                }
            }
            return result;
        }

        // Self contained, fed from convertCurrency
        function calculateFee(fee) {
            let bankFee = fee;
            switch (bankFee) {
                case '0%':
                    bankFee = 0;
                    break;
                case '2%':
                    bankFee = 0.02;
                    break;
                case '4%':
                    bankFee = 0.04;
                    break;
                case '6%':
                    bankFee = 0.06;
                    break;
                default:
                    bankFee = 1;
            }
            return bankFee;
        }



        // Self-contained
        function getRate(c) {
            if(c === 'EUR') {
                return 1;
            }

            else {
                let cur = curr[c];
                return cur;
            }
        }

        this.init = function () {

        };



    }


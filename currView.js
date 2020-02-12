function currView() {
    let calculator = document.getElementById("calc");
    let clr = document.getElementById("clear");
    let one = document.getElementById("one");
    let two = document.getElementById("two");
    let three = document.getElementById("three");
    let four = document.getElementById("four");
    let five = document.getElementById("five");
    let six = document.getElementById("six");
    let seven = document.getElementById("seven");
    let eight = document.getElementById("eight");
    let nine = document.getElementById("nine");
    let zero = document.getElementById("zero");
    let eq = document.getElementById("eq");
    let bFee = document.getElementById("bankFee");
    let flabel = document.getElementById("for-label");
    let tlabel = document.getElementById("to-label");

    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    var openNav = true,
        addMouseAndTouchUp = function (elementID, handler) {
            //utility function to add both mouseup and touchend events and prevent double events
            var element = document.getElementById(elementID),
                f = function (e) {
                    e.preventDefault();//stops mobile browsers faking the mouse events after touch events
                    handler(e);
                    return false;
                };
            element.addEventListener("mouseup", f, false);
            element.addEventListener("touchend", f, false);
        },
        openCloseNav = function () {
            //doggle the side menu reveal
            if (openNav) {
                openNav = false;
                document.getElementById("nav").className = "closedmenu";
                document.getElementById("mainsection").className = "closedmenu";
                document.getElementById("navelem").style.display = "none";
            } else {
                openNav = true;
                document.getElementById("nav").className = "";
                document.getElementById("mainsection").className = "";
                document.getElementById("navelem").style.display = "block";
            }
        },
        showAbout = function () {
            //handle showing about box purely within the view as their's no model involved
            document.getElementById("popupAbout").style.display = "block";
            history.pushState(null, null, "#about");
        },
        hideAbout = function () {
            //handle hiding about box purely within the view
            document.getElementById("popupAbout").style.display = "none";
            if (openNav) {
                openCloseNav();
            }
        };
    ;


    let f = document.forms['visit'].elements['visitingCurrency'];
    let t = document.forms['home'].elements['homeCurrency'];


    for(let i=0;i<f.length;i++){
        if(localStorage['visitingCurrency']);
        if(f[i].value == localStorage['visitingCurrency']){
            f[i].checked = true;
        }
    }
    for(let i=0;t<f.length;i++){
        if(localStorage['homeCurrency']);
        if(t[i].value == localStorage['visitingCurrency']){
            t[i].checked = true;
        }
    }

    for (let i=0, len=f.length; i<len; i++) {
        f[i].onclick = function() {
            localStorage['visitingCurrency'] = f.value;
            calculator.display.value = "0 " + f.value;
            flabel.innerHTML="<img style = \"margin-right: 0.2rem;\" src=\"images/"+f.value.toLowerCase()+".png\" width=\"40rem\" height=\"40rem\">";
        };
    }

    for (let i=0, len=t.length; i<len; i++) {
        t[i].onclick = function() {
            localStorage['homeCurrency'] = t.value;
            tlabel.innerHTML="<img style = \"margin-right: 0.2rem;\" src=\"images/"+t.value.toLowerCase()+".png\" width=\"40rem\" height=\"40rem\">";
        };
    }

    bFee.onchange = function () {
        localStorage['bankFee'] = bFee.value;
    };

    if((localStorage['visitingCurrency']) && (localStorage['homeCurrency'])){
        flabel.innerHTML="<img style = \"margin-right: 0.2rem;\" src=\"images/"+localStorage['visitingCurrency'].toLowerCase()+".png\" width=\"40rem\" height=\"40rem\">";
        tlabel.innerHTML="<img style = \"margin-right: 0.2rem;\" src=\"images/"+localStorage['homeCurrency'].toLowerCase()+".png\" width=\"40rem\" height=\"40rem\">";
    }

    else{
        flabel.innerHTML="<img style = \"margin-right: 0.2rem;\" src=\"images/"+f.value.toLowerCase()+".png\" width=\"40rem\" height=\"40rem\">";
        tlabel.innerHTML="<img style = \"margin-right: 0.2rem;\" src=\"images/"+t.value.toLowerCase()+".png\" width=\"40rem\" height=\"40rem\">";
    }



    window.onload = function currMem() {
        if (localStorage['homeCurrency'])
            t.value = localStorage['homeCurrency'];
        if (localStorage['visitingCurrency'])
            f.value = localStorage['visitingCurrency'];
        if (localStorage['bankFee'])
            bFee.value = localStorage['bankFee'];

        if(navigator.onLine) {
            if(localStorage['rates_updated']){
                document.getElementById('refreshrates').innerHTML = "Rates last updated: " + localStorage['rates_updated'];
            }

            else{
                document.getElementById('refreshrates').innerHTML = "Rates last updated: " + dateTime;
            }
        }

        if(!navigator.onLine) {
            if(localStorage['rates_updated']){
                document.getElementById('refreshrates').innerHTML = "Rates last updated: " + localStorage['rates_updated'];

            }
            else{
                document.getElementById('refreshrates').innerHTML = "Using last saved rates!";
            }

        }

    }

    if(localStorage['visitingCurrency']){
        calculator.display.value = "0 " + f.value;

    }

    else{
        calculator.display.value = "0 " + f.value;
    }

    this.init = function () {


        openCloseNav();
        addMouseAndTouchUp("navmenu", openCloseNav);
        addMouseAndTouchUp("navMenuAbout", showAbout);

        //handle closing of about window using history
        //so that back buttons work (esp important on Android for hard back key
        addMouseAndTouchUp("popupAbout", function () {
            window.history.back();
        });
        window.addEventListener("popstate", function (evt) {
            hideAbout();
        });

        this.setBtnOneCallBack = function (callback) {
            one.addEventListener("click", callback);
        };
        this.setBtnTwoCallBack = function (callback) {
            two.addEventListener("click", callback);
        };
        this.setBtnThreeCallBack = function (callback) {
            three.addEventListener("click", callback);
        };
        this.setBtnFourCallBack = function (callback) {
            four.addEventListener("click", callback);
        };
        this.setBtnFiveCallBack = function (callback) {
            five.addEventListener("click", callback);
        };
        this.setBtnSixCallBack = function (callback) {
            six.addEventListener("click", callback);
        };
        this.setBtnSevenCallBack = function (callback) {
            seven.addEventListener("click", callback);
        };
        this.setBtnEightCallBack = function (callback) {
            eight.addEventListener("click", callback);
        };
        this.setBtnNineCallBack = function (callback) {
            nine.addEventListener("click", callback);
        };
        this.setBtnZeroCallBack = function (callback) {
            zero.addEventListener("click", callback);
        };
        this.setBtnClrCallBack = function (callback) {
            clr.addEventListener("click", callback);
        };
        this.setBtnEqCallBack = function (callback) {
            eq.addEventListener("click", callback);
        };



        //document.getElementById("urlspan").innerHTML = window.location.protocol + "//" + window.location.host + window.location.pathname;

        this.getTo = function () {
            return t.value;
        };

        this.getFrom = function () {
            return f.value;
        };

        this.getFee = function () {
            return bFee.value;
        };

        this.getAmount = function(){
            return (calculator.display.value);
        }

        this.disp = function (d) {
            let num = d;

            if(num === 'clr'){
                calculator.display.value = "0 " + f.value ;
            }

            if(!isNaN(calculator.display.value)) {
                calculator.display.value += num;
            }
            if(isNaN(calculator.display.value) && (num !== 'clr' )) {
                calculator.display.value = "";
                calculator.display.value += num;
            }
        }

        this.alterDisp = function (v) {
            let val = v;
            if(!isNaN(calculator.display.value)) {
                calculator.display.value = "";
                calculator.display.value += val;
            }
        }
    };
}


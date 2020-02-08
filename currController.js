/* jshint -W097 */
"use strict";

function currController() {
    var model = new currModel(),
        view = new currView(),
        controller = null;

    this.init = function () {
        view.init();
        model.init();

        view.setBtnClrCallBack(function () {
            view.disp('clr',);
        });
        view.setBtnOneCallBack(function () {
            view.disp(1);
        });
        view.setBtnTwoCallBack(function () {
            view.disp(2);
        });
        view.setBtnThreeCallBack(function () {
            view.disp(3);
        });
        view.setBtnFourCallBack(function () {
            view.disp(4);
        });
        view.setBtnFiveCallBack(function () {
            view.disp(5);
        });
        view.setBtnSixCallBack(function () {
            view.disp(6);
        });
        view.setBtnSevenCallBack(function () {
            view.disp(7);
        });
        view.setBtnEightCallBack(function () {
            view.disp(8);
        });
        view.setBtnNineCallBack(function () {
            view.disp(9);
        });
        view.setBtnZeroCallBack(function () {
            view.disp(0);
        });
        view.setBtnEqCallBack(function () {
            let home = view.getTo();
            let away = view.getFrom();
            let fee = view.getFee();
            let amount = view.getAmount();
            model.convertCurrency(home, away, fee, amount);
        });

        view.setBtnEqCallBack(function () {
            let d = model.getDisp()
            view.alterDisp(d);
        });



    };
};



let cc = new currController();
window.addEventListener("load", cc.init, false);
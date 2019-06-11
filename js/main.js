// "use strict"

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    // val = document.querySelectorAll("div[class$='-value']"),
    expensesItem = document.getElementsByClassName('expenses-item'),
    // btns = document.getElementsByTagName('button'),
    // approveBtn = [btns[0], btns[1]],
    // calculateBtn = btns[2],
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('#income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
let money, time;
expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;

});

expensesBtn.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ((typeof(a)) != null && (typeof(b)) != null && a != "" && b != "" && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
        }else{
            i = i - 1;
        }
        console.log(sum);
    }
    expensesValue.textContent = sum;
    
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ', ';
    }
});

countBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        let exp = appData.expenses;
        console.log(exp);
        let sum = 0;
        for(key in exp){
            sum += +exp[key];
        }
        appData.moneyPerDay = ((appData.budget - sum) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    // } else if (appData.budget != undefined) {
    //     appData.moneyPerDay = ((appData.budget) / 30).toFixed();
    //     dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        }else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        }else if (appData.moneyPerDay > 2000){
            levelValue.textContent = "Высокий уровень достатка";
        }else{
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        dayBudgetValue.textContent = "Произошла ошибка";
    }
});

incomeItem.addEventListener('input', function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if(appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    income: [],
    savings: false,
    optionalExpenses: {},
    // chooseExpenses: function() {
    //     for (let i = 0; i < 2; i++) {
    //         let a = prompt("Введите обезательную статью расходов в этом месяце", ""),
    //             b = prompt("Во сколько обойдется?", "");
    
    //         if ( (typeof(a)) === 'string' && (typeof(a)) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
    //             console.log("done");
    //             appData.expenses[a] = b;
    //         }else{
    //             i = i - 1;
    //         }
    //     }
    // },
    // detectedDayBudget: function() {
    //     appData.moneyPerDay = (appData.budget / 30).toFixed();
    //     alert("Ежедневный бюджет: " + appData.moneyPerDay);
    // },
    // detectedLevel: function() {
    //     if (appData.moneyPerDay < 100) {
    //         console.log("Мигимальный уровень достатка");
    //     }else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    //         console.log("Средний уровень достатка");
    //     }else if (appData.moneyPerDay > 2000){
    //         console.log("Высокий уровень достатка");
    //     }else{
    //         console.log("Произошла ошибка");
    //     }
    // },
    // checkSavings: function() {
    //     if (appData.savings == true) {
    //         let save = +prompt("Какова сумма накоплений?", ""),
    //             percent = + prompt("Под какой процент?", "");
    
    //         appData.mounthIncome = save/100/12*percent;
    //         alert("Доход в месяц с вашего депозита: " + appData.mounthIncome);
    //     }
    // },
    // chooseOptExpenses: function() {
    //     for (let i = 1; i <= 3; i++) {
    //         let opt = prompt("Статья необязательных расходов?", "");
    //         appData.optionalExpenses[i] = opt;
    //     }
    // },
    // chooseIncome: function() {
    //     for (let i = 0; i < 1; i++) {
    //         let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");
    //         if ((typeof(items)) === 'string' && (typeof(items)) != null && items != "") {
    //             appData.income = items.split(", ");
    //             appData.income.push(prompt("Может что-то еще?", ""));
    //             appData.income.sort();
    //         }else { 
    //             i = i - 1;
    //         }
    //     }
    //     appData.income.forEach(function(item, i) {
    //         alert("Способы доп. зароботка " + ++i + ": " + item);
    //     });
    // }
};
// appData.chooseIncome();
// for (let key in appData) {
//     alert("Наша программа включает в себя данные: " + appData[key]);
// }
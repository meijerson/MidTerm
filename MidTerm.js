/**
 *   @author Bloswick, Mackenzie (bloswickm@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary CIS 104 Mid Term || created: 11.07.2016
 *   @todo
 */
"use strict";
const PROMPT = require('readline-sync');

let firstTime, userCheckingAmt, userSavingsAmt, usersIndex;
let userAnswer;
let continueProgram;
let userNames = [];
let cardNumbers = [], pins = [];

function main() {
    if (firstTime == null) {
        welcome();
        fillAccounts();
        askUserName();
        askCardNumber();
        askPin();
        setUpAccount();
        firstTime = 1
    }setContinueProgram();
    while (continueProgram === 1) {
        showUserOptions();
        if (userAnswer == 1) {
            withdraw();
        }else if (userAnswer == 2) {
            deposit();
        }else if (userAnswer == 3) {
            transfer();
        }else if (userAnswer == 4) {
            continueProgram = 0
        }
    }
    quitATM();
}

main();

function welcome() {
    console.log(`\nHello, and welcome to your local Automatic Teller Machine. For your security, you must answer a few questions to access your account.`);
}

function fillAccounts() {
    userNames[0] = 'Adam Aardvark';
    userNames[1] = 'Bob Builder';
    userNames[2] = 'Cassy Castle';
    cardNumbers[0] = 1212;
    cardNumbers[1] = 3131;
    cardNumbers[2] = 7878;
    pins[0] = 1112;
    pins[1] = 2223;
    pins[2] = 3334;
}

function setContinueProgram() {
    if (continueProgram != null) {
        continueProgram = -1;
        while (continueProgram !== 0 && continueProgram !== 1) {
            continueProgram = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueProgram = 1;
    }
}

function askUserName() {
    let answered = 1;
    for (let i = 0; i <= userNames.length; i++) {
        if (answered == 1) {
            userAnswer = PROMPT.question(`\nPlease enter your card holder name: `);

            answered = 2;
        }
        if (i == userNames.length) {
        console.log(`\nThat is an invalid card name. Please try again. `);
            return askUserName();
        }
        else if (userAnswer == userNames[i]) {
            process.stdout.write('\x1Bc');
            console.log(`Success.`);
            usersIndex = i;
            break
        }
    }
}

function askCardNumber() {
    userAnswer = PROMPT.question(`\nPlease enter your card number: `);
    if (userAnswer != cardNumbers[usersIndex]) {
        console.log(`\nThat is an invalid card number. Please try again.`);
        return askCardNumber();
    }
    else if (userAnswer == cardNumbers[usersIndex]) {
        process.stdout.write('\x1Bc');
        console.log(`Success.`);
    }
}

function askPin() {
    for (let i = 2; i > -1; i--) {
        userAnswer = PROMPT.question(`\nPlease enter your account pin: `);
        if (userAnswer == pins[usersIndex]) {
            console.log(`You've successfully accessed your account.`);
            break;
        } else {
            console.log(`\nYou have incorrectly entered your pin number. You have ${i} tries left: `);
            if (i==0) {
                console.log(`\nYou have not successfully accessed your account. Please contact your bank for more information.\nHave a nice day.`);
                firstTime = null;
                return main();
            }

        }
    }
}

function setUpAccount() {
    if (userCheckingAmt == null)
        userCheckingAmt = 1000;
    if (userSavingsAmt == null)
        userSavingsAmt = 1000;
}

function showUserOptions() {
    userAnswer = PROMPT.question(`\n\t${userNames[usersIndex]}, please select an option from the following: 
    \n\t1. Withdraw Funds\n\t2. Deposit Funds\n\t3. Transfer Funds\n\t4. Exit\nPlease choose by entering a number 1 through 4: `);
}

function withdraw() {
    process.stdout.write('\x1Bc');
    userAnswer = PROMPT.questionInt(`\nYou have chosen to withdraw funds. From which account would you like to withdraw?
    \n\t1. Checking\n\t2. Savings\n\t3. Exit\nPlease choose by entering a number 1 through 3: `);
    if (userAnswer == 1) {
        userAnswer = PROMPT.questionInt(`The current balance in your checking is $${userCheckingAmt}. How much would you like to withdraw?: `);
        userCheckingAmt = userCheckingAmt - userAnswer;
        console.log(`You have chosen to withdraw $${userAnswer} from your account. Your current checking balance is now $${userCheckingAmt}`);
        return main();
    }
    else if (userAnswer == 2) {
        userAnswer = PROMPT.questionInt(`The current balance in your savings is $${userSavingsAmt}. How much would you like to withdraw?: `);
        userSavingsAmt = userSavingsAmt - userAnswer;
        console.log(`You have chosen to withdraw $${userAnswer} from your account. Your current savings balance is now $${userSavingsAmt}`);
        return main();
    }
    else if (userAnswer == 3) {
        quitATM();
    }
    else {
        console.log(`Incorrect selection. Try again. `);
        return withdraw();
    }
}

function deposit() {
    process.stdout.write('\x1Bc');
    userAnswer = PROMPT.questionInt(`\nYou have chosen to deposit funds. Which account would you like to deposit into?
    \n\t1. Checking\n\t2. Savings\n\t3. Exit\nPlease choose by entering a number 1 through 3: `);
    if (userAnswer == 1) {
        userAnswer = PROMPT.questionInt(`The current balance in your checking is $${userCheckingAmt}. How much would you like to deposit?: `);
        userCheckingAmt = userCheckingAmt + userAnswer;
        console.log(`You have chosen to deposit $${userAnswer} into your account. Your current checking balance is now $${userCheckingAmt}`);
        return main();
    }
    else if (userAnswer == 2) {
        userAnswer = PROMPT.questionInt(`The current balance in your savings is $${userSavingsAmt}. How much would you like to deposit?: `);
        userSavingsAmt = userSavingsAmt + userAnswer;
        console.log(`You have chosen to deposit $${userAnswer} into your account. Your current savings balance is now $${userSavingsAmt}`);
        return main();
    }
    else if (userAnswer == 3) {
        quitATM();
    }
    else {
        console.log(`Incorrect selection. Try again. `);
        return deposit();
    }
}

function transfer() {
    process.stdout.write('\x1Bc');
    userAnswer = PROMPT.questionInt(`\nYou have chosen to transfer funds. Please make your transfer selection.
    \n\t1. Transfer funds from Checking to Savings\n\t2. Transfer funds from Savings to Checking\n\t3. Exit\nPlease choose by entering a number 1 through 3: `);
    if (userAnswer == 1) {
        userAnswer = PROMPT.questionInt(`The current balance in your checking is $${userCheckingAmt}, and your savings is $${userSavingsAmt}. 
        How much would you like to transfer from checking to savings?: `);
        userSavingsAmt = userSavingsAmt + userAnswer;
        userCheckingAmt = userCheckingAmt - userAnswer;
        console.log(`You have chosen to transfer $${userAnswer} from checking to savings. Your current checking balance is now $${userCheckingAmt}, and your savings is $${userSavingsAmt}. `);
        return main();
    }
    else if (userAnswer == 2) {
        userAnswer = PROMPT.questionInt(`The current balance in your savings is $${userSavingsAmt}, and your checking is $${userCheckingAmt}. 
        How much would you like to transfer from savings to checking?: `);
        userCheckingAmt = userCheckingAmt + userAnswer;
        userSavingsAmt = userSavingsAmt - userAnswer;
        console.log(`You have chosen to transfer $${userAnswer} from savings to checking. Your current savings balance is now $${userSavingsAmt}, and your checking is $${userCheckingAmt}. `);
        return main();
    }
    else if (userAnswer == 3) {
        quitATM();
    }
    else {
        console.log(`Incorrect selection. Try again. `);
        return transfer();
    }
}

function quitATM() {
    //process.stdout.write('\x1Bc');
    userAnswer = PROMPT.question(`Thank you for using our Automatic Teller Machine. Would you like a receipt?\n\t1. Yes\n\t2. No\n`);
    if (userAnswer == 1) {
        console.log(`\n${userNames[usersIndex]}'s Receipt:\nChecking Balance: ${userCheckingAmt}\nSavings Balance: ${userSavingsAmt}`);
    }
}
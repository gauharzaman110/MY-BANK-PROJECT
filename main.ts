import chalk from "chalk";
import { Faker, faker } from "@faker-js/faker";
import inquirer from "inquirer";

class Customer{
    firstName:string
    lastname:string
    age: number
    gender: string
    mobNumber: number
    accNumber: number

    constructor(fName:string, lName:string, age:number, gen:string, mob:number, acc:number){
        this.firstName = fName
        this.lastname = lName
        this.age = age
        this.gender = gen
        this.mobNumber = mob
        this.accNumber = acc
        
    }
}

interface BanAccount{
    accNumber : number,
    balance: number,
}


class Bank{
    customer: Customer[] = []
    account: BanAccount[] = []
addCustomer(obj:Customer){
this.customer.push(obj)
}
addAccountNumber(obj:BanAccount){
this.account.push(obj);
}
transaction(accObj:BanAccount){
let newAccounts = this.account.filter(acc => acc.accNumber !== accObj.accNumber)
this.account = [...newAccounts, accObj ]
}
}

let myBank = new Bank();


//for customer
for(let a:number = 1; a<=3; a++){
let fName = faker.person.firstName('male')
let lName = faker.person.lastName()
let num = parseInt(faker.phone.number())
const cus = new Customer(fName, lName, 25*a, "Male", num, 1000+a)
myBank.addCustomer(cus);
myBank.addAccountNumber({accNumber:cus.accNumber, balance:100*a})
}

//Bank functionality
async function bankService(bank:Bank) {
    
}
do{
  let service = await inquirer.prompt({
    type: "list",
    name: "Select",
    message: "Please select any service",
    choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"]
})
if(service.Select == "View Balance"){
  let res = await inquirer.prompt({
    type: "input",
    name: "num",
    message: "Please enter your account number.."
  })
  let account = myBank.account.find((acc)=> acc.accNumber == res.num)
  if(!account){
    console.log(chalk.red.bold("Invalid account Number"))
  }
  if(account){
    let name = myBank.customer.find((item)=>item.accNumber==account?.accNumber)
    console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastname)} your account Balance is ${chalk.bold.italic.green("$", account.balance)}`)
  }
}
if(service.Select == "Cash Withdraw"){
  let res = await inquirer.prompt({
    type: "input",
    name: "num",
    message: "Please enter your account number.."
  })
  let account = myBank.account.find((acc)=> acc.accNumber == res.num)
  if(!account){
    console.log(chalk.red.bold("Invalid account Number"))
  }
  if(account){
    let ans = await inquirer.prompt({
      type: "number",
      name: "rupee",
      message: "Please enter your Amount.."
    })
    if(ans.rupee > account.balance){
      console.log(chalk.bold.red("insufficient Balance"))
      process.exit()
    }
    let newBalance = account.balance - ans.rupee
    // transaction method
    myBank.transaction({accNumber:account.accNumber,balance:newBalance})
    console.log(newBalance)
  }
}
if(service.Select == "Cash Deposit"){
  let res = await inquirer.prompt({
    type: "input",
    name: "num",
    message: "Please enter your account number.."
  })
  let account = myBank.account.find((acc)=> acc.accNumber == res.num)
  if(!account){
    console.log(chalk.red.bold("Invalid account Number"))
  }
  if(account){
    let ans = await inquirer.prompt({
      type: "number",
      name: "rupee",
      message: "Please enter your Amount.."
    })
    let newBalance = account.balance + ans.rupee
    
}
}
if(service.Select == "Exit"){
  process.exit()
}
}while(true)
bankService(myBank)
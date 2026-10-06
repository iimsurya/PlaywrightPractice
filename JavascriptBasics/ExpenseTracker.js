// Test your JavaScript Array knowledge
//
//     Create an array called expenses that contains at least 5 different expense amounts.
//     Calculate the total expenses by summing all the elements of the array.
//     Find the highest and lowest individual expenses within the array.

class ExpenseTracker {

    expenses = [12,15,19,11,29];

    totalExpense(){

        return this.expenses.reduce((expense, sum)=>sum+expense,0);
    }

    findHighest(){

        //return this.expenses.filter((a,b)=> b-a,0);
        return Math.max(...this.expenses);
    }

    findMinimum(){
        return Math.min(...this.expenses);
    }

}

const expense = new ExpenseTracker();
console.log(expense.totalExpense());
console.log(expense.findHighest());
console.log(expense.findMinimum());
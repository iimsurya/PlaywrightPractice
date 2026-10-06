class StudentTracker {

    studentNames = ['Amal', 'Sumal', 'Kumal', 'Vimal', 'Kamal'];

    addStudent(name) {
        this.studentNames.unshift(name)
    }

    addAndRemoveWithIndex(operation, index, newWord){

        if(operation.toLowerCase() === 'remove'){
            this.studentNames.splice(index, 1)
        }else if(operation.toLowerCase() === 'add'){
            this.studentNames.splice(index, 0, newWord)
        }else {
            return 'Undefined Operator - Please choose between Add/Remove'
        }
        return this.studentNames
    }

}
    const student = new StudentTracker();
    // student.addStudent('Nimal');
    // console.log(student.studentNames);
    // student.studentNames.pop();
    // console.log(student.studentNames);
    console.log(student.addAndRemoveWithIndex('remove',1));
    console.log(student.addAndRemoveWithIndex('add', 0, 'Ramal'))
    console.log(student.studentNames.sort())
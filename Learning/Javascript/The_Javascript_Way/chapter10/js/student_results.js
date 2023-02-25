/*
Here’s a programme that shows female students results (name and average grade).
const students = [
    {
    name: "Anna",
    sex: "f",
    grades: [4.5, 3.5, 4]
    },
    {
    name: "Dennis",
    sex: "m",
    country: "Germany",
    grades: [5, 1.5, 4]
    },
    {
    name: "Martha",
    sex: "f",
    grades: [5, 4, 2.5, 3]
    },
    {
    name: "Brock",
    sex: "m",
    grades: [4, 3, 2]
    }
];
// Compute female student results
const femaleStudentsResults = [];
for (const student of students) {
    if (student.sex === "f") {
        let gradesSum = 0;
        for (const grade of student.grades) {
            gradesSum += grade;
        }
        const averageGrade = gradesSum / student.grades.length;
        femaleStudentsResults.push({
            name: student.name,
            avgGrade: averageGrade
        });
    }
}
console.log(femaleStudentsResults);

Refactor it using functional programming. Execution result must stay the same.
*/

/*
1. Filter out female students
2. Average the grades
3. Create avgGrade property
4. Create new object with name and avgGrade in an array
*/

const students = [
    {
    name: "Anna",
    sex: "f",
    grades: [4.5, 3.5, 4]
    },
    {
    name: "Dennis",
    sex: "m",
    country: "Germany",
    grades: [5, 1.5, 4]
    },
    {
    name: "Martha",
    sex: "f",
    grades: [5, 4, 2.5, 3]
    },
    {
    name: "Brock",
    sex: "m",
    grades: [4, 3, 2]
    }
];
    
/* function reducer(acc, value, index, array) {
    let calculatedValue = acc + value;
    if (index === array.length - 1) {
        return calculatedValue / array.length;
    }
    return calculatedValue;
}

const avgGrade = students.map((student) => {
    let sum = student.grades.reduce((acc, value) => acc + value, 0);
    return sum / student.grades.length;
});

// console.log(avgGrade); */

const female = student => student.sex === "f";
// console.log(female);

const average = array => array.reduce((acc, value) => acc + value, 0) / array.length;

const femaleStudentsResults = students.filter(female).map(student => {
    return {
        name: student.name,
        avgGrade: average(student.grades)
    };
});

console.log(femaleStudentsResults);

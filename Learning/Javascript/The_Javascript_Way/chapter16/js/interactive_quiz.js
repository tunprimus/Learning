/* Complete this code to display the questions in the <div> element of the page, with a "Show the answer" button next to each question. Clicking this button replaces it with the answer for this question.
*/

const questions = [
    {
        statement: "2+2?",
        answer: "2+2 = 4"
    },
    {
        statement: "In which year did Christopher Columbus discover America?",
        answer: "1492"
    },
    {
        statement: "What occurs twice in a lifetime, but once in every year, twice in a week but never in a day?",
        answer: "The E letter"
    }
];

const quizElement = document.getElementById("content");
const dlElement = document.createElement("dl");

let i = 1;
questions.forEach(item => {
    const dtElement = document.createElement("dt");
    const strongElement = document.createElement("strong");
    strongElement.textContent = `Question ${i}: `;
    strongElement.innerHTML += item.statement;
    
    const ddElement = document.createElement("dd");
    const btnElement = document.createElement("button");
    btnElement.textContent = "Show answer";
    ddElement.appendChild(btnElement);
    
    ddElement.addEventListener("click", () => {
        ddElement.innerHTML = item.answer;
    });

    dtElement.appendChild(strongElement);
    dlElement.appendChild(dtElement);
    dlElement.appendChild(ddElement);
    
    i++;
});

// Add to the parent on the document
quizElement.appendChild(dlElement);

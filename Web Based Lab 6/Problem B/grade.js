/* ERROR LOG (PART 1 - 14 ERRORS IDENTIFIED)

1. (grade.html, Line 9): onsubmit="checkMark()" lacked "return" and checkMark() returned true, causing the form to reload the page and erase the result immediately.
2. (grade.html, Line 17): Button called onclick="showtable()" (lowercase 't'), while the function in grade.js is named showTable().
3. (grade.html, Line 19): Script tag linked to src="grades.js" instead of src="grade.js".
4. (grade.js, Lines 2 & 3): Missing "=" assignment operators after "let name" and "let mark", plus mismatched bracket ["mark").
5. (grade.js, Line 4): Single "=" used in if (name = "") instead of comparison "===", and missing closing brace "}" before the next if statement.
6. (grade.js, Line 7): Misspelled function name isNan(mark) instead of isNaN(mark).
7. (grade.js, Lines 8-12): Mismatched/misplaced curly braces causing the alert statements to run out of order.
8. (grade.js, Line 13): Used "&&" instead of "||" in (mark < 0 && mark > 100)—a number cannot be both less than 0 and greater than 100 at the same time.
9. (grade.js, Line 16): Missing "=" assignment operator in "mark parseInt(mark);".
10. (grade.js, Line 23): Missing closing parenthesis ")" in else if (mark >= 50.
11. (grade.js, Line 24): Lowercase grade = "c" instead of uppercase "C".
12. (grade.js, Line 26): Missing "=" assignment operator in grade "F";.
13. (grade.js, Lines 28-30): Wrong capitalization getElementByID, missing quotes around " got grade ", and British spelling style.colour instead of style.color.
14. (grade.js, Lines 38-42): Loop started at i = 1 (skipping index 0 / Grade A), closed "</table>" inside the loop, and misspelled innerHtml instead of innerHTML.

*/

// Part 1 & Part 2: Validate inputs, determine grade, set dynamic colour and timestamp
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();
    let resultEl = document.getElementById("result");
    let timeEl = document.getElementById("checkedTime");

    // Case 1: Empty name validation
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extended Requirement 5: Empty mark validation
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Case 2: Non-numeric validation
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    let mark = parseInt(markInput, 10);

    // Case 3: Out-of-range validation (0 to 100)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and set colour according to grade (Requirement 6)
    let grade = "";
    let resultColor = "";

    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    // Display result and date/time checked (Requirement 8)
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = resultColor;

    timeEl.innerHTML = "Checked on: " + new Date();
    timeEl.style.color = resultColor;

    // Return false so the form does not refresh the page and wipe the output
    return false;
}

// Extended Requirement 7: Generate random whole number from 0 to 100
function generateRandomMark() {
    let randomNum = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomNum;
}

// Fixed Loop: Display all four grades (starting at index 0)
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table><thead><tr><th>Grade</th><th>Mark range</th></tr></thead><tbody>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</tbody></table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
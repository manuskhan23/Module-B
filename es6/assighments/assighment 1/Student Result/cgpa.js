function generateSubjectInputs() {
    const subjectCount = parseInt(document.getElementById('subjectCount').value);
    if (!subjectCount || subjectCount < 1) return alert("Enter valid subject count");

    const container = document.getElementById('subjectsContainer');
    container.innerHTML = '';

    for (let i = 1; i <= subjectCount; i++) {
        const div = document.createElement('div');
        div.className = 'form-floating mb-3 subject-group';
        div.innerHTML = `<input type="text" placeholder="Course ${i} Name" class="form-control subjectName">
                         <label>Course ${i} Name</label>`;
        container.appendChild(div);
    }

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('cgpa').style.display='none';
};

let subjects = [];

function generateMarkInputs(){
    subjects = [...document.getElementsByClassName('subjectName')].map(input => input.value.trim());
    if (subjects.includes('') || subjects.length === 0) return alert("Enter all subject names");

    const container = document.getElementById('marksContainer');
    container.innerHTML = '';

    subjects.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'subject-group';
        div.innerHTML = `
            <h5 class="mb-2">${subject}</h5>
            <div class="form-floating mb-2">
                <input type="number" placeholder="Marks Obtained" class="form-control marksObtained" min="0">
                <label>Marks Obtained</label>
            </div>
            <div class="form-floating mb-3">
                <input type="number" placeholder="Maximum Marks" class="form-control marksMax" min="1">
                <label>Maximum Marks</label>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
};

function showMarkSheet() {
    const obtained = [...document.getElementsByClassName('marksObtained')].map(inp => parseFloat(inp.value));
    const max = [...document.getElementsByClassName('marksMax')].map(inp => parseFloat(inp.value));

    if (obtained.includes(NaN) || max.includes(NaN)) return alert("Enter valid marks");

    const totalObtained = obtained.reduce((a, b) => a + b, 0);
    const totalMax = max.reduce((a, b) => a + b, 0);

    // Calculate CGPA for each subject
    // Formula: (Obtained / Max) * 4
    const gradePoints = obtained.map((mark, index) => (mark / max[index]) * 4);

    // Calculate CGPA as average of grade points
    const cgpa = gradePoints.reduce((a, b) => a + b, 0) / gradePoints.length;

    // Determine Grade using ternary operator
    const grade = cgpa >= 3.7 ? "A+" :
                    cgpa >= 3.3 ? "A" :
                    cgpa >= 3.0 ? "B+" :
                    cgpa >= 2.7 ? "B" :
                    cgpa >= 2.3 ? "C+" :
                    cgpa >= 2.0 ? "C" :
                    cgpa >= 1.7 ? "D+" :
                    cgpa >= 1.0 ? "D" : "F";

    // Freeze school object
    const school = { name: document.getElementById('schoolName').value };
    Object.freeze(school);

    const markSheetDiv = document.getElementById('markSheet');
    let html = `<h3 class="text-center">${school.name}</h3><hr>`;

    for (const [index, sub] of subjects.entries()) {
        html += `<p>${sub}: ${obtained[index]} / ${max[index]} &nbsp; (Grade Point: ${gradePoints[index].toFixed(2)})</p>`;
    }

    html += `<hr><p><strong>Total Marks: ${totalObtained} / ${totalMax}</strong></p>`;
    html += `<p><strong>CGPA: ${cgpa.toFixed(2)} / 4.0</strong></p>`;
    html += `<p><strong>Grade: ${grade}</strong></p>`;

    markSheetDiv.innerHTML = html;
    document.getElementById('step3').style.display = 'none';
    markSheetDiv.style.display = 'block';

    // Debug: object methods
    console.log("School Keys:", Object.keys(school));
    console.log("School Values:", Object.values(school));
    console.log("School Entries:", Object.entries(school));
}

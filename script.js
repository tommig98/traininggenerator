document.addEventListener("DOMContentLoaded", function() {
    const formStepName = document.getElementById("formStepName");
    const formStep1 = document.getElementById("formStep1");
    const formStep2 = document.getElementById("formStep2");
    const trainingProgram = document.getElementById("trainingProgram");
    const nextStepName = document.getElementById("nextStepName");
    const nextStep = document.getElementById("nextStep");
    const generateProgram = document.getElementById("generateProgram");
    const programOutput = document.getElementById("programOutput");
    const downloadPDF = document.getElementById("downloadPDF");
    const modifyProgram = document.getElementById("modifyProgram");
    const programHeader = document.getElementById("programHeader");
    const userNameElement = document.getElementById("userName");

    let firstName = '';
    let lastName = '';

    // Mostra il primo step al caricamento
    formStepName.classList.add("active");

    // Step per inserire nome e cognome
    nextStepName.addEventListener("click", function() {
        firstName = document.getElementById("firstName").value;
        lastName = document.getElementById("lastName").value;

        if (firstName && lastName) {
            formStepName.classList.remove("active");
            formStep1.classList.add("active");
        } else {
            alert("Inserisci nome e cognome");
        }
    });

    // Passa al prossimo step
    nextStep.addEventListener("click", function() {
        formStep1.classList.remove("active");
        formStep2.classList.add("active");
    });

    // Genera programma di allenamento
    generateProgram.addEventListener("click", function() {
        formStep2.classList.remove("active");
        trainingProgram.classList.add("active");

        const days = parseInt(document.getElementById("days").value);
        const duration = parseFloat(document.getElementById("duration").value);
        const goal = document.getElementById("goal").value;
        const trainingType = document.getElementById("trainingType").value;

        // Generazione della scheda di allenamento
        let program = generateTrainingProgram(days, duration, trainingType);

        // Aggiunge il nome e cognome in cima
        userNameElement.textContent = `${firstName} ${lastName}`;

        // Mostra il programma generato
        programOutput.innerHTML = generateProgramHTML(program);
    });

    // Funzione per generare il contenuto HTML della scheda
    function generateProgramHTML(program) {
        let html = "";
        program.forEach(day => {
            html += `<h3>${day.title}</h3>`;
            html += '<table class="table">';
            html += '<tr><th>Esercizio</th></tr>'; // Aggiungiamo un'intestazione alla tabella
            day.exercises.forEach(exercise => {
                html += `<tr><td>${exercise}</td></tr>`;
            });
            html += "</table>";
        });
        return html;
    }

    // Funzione per generare la struttura della scheda
function generateTrainingProgram(days, duration, trainingType) {
    let exercises = {
        totalBody: ["Squat", "Panca Piana", "Stacco da Terra", "Affondi", "Lat Machine", "Curl Bicipiti", "Estensioni Tricipiti", "Crunch", "Plank", "Leg Press", "Pressa Militare", "Rowing", "Trazioni alla sbarra", "Rematore con Manubri"],
        splitRoutine: {
            A: ["Panca Piana", "Croci con Manubri", "Push-Up", "Distensioni sopra la testa", "Spinte Manubri", "Curl Bicipiti"],
            B: ["Squat", "Leg Press", "Affondi", "Stacchi Rumeni", "Calf Raise", "Leg Extension"],
            C: ["Lat Machine", "Pull-Up", "Rowing", "Pulley Basso", "Rematore con Manubri", "Hyperextension"],
            D: ["Crunch", "Plank", "Russian Twist", "Mountain Climbers", "Sit-Up"]
        }
    };

    // Funzione per scaricare la scheda come PDF
downloadPDF.addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Aggiunge il titolo con nome e cognome
    doc.setFontSize(18);
    doc.text(`Programma di allenamento di ${firstName} ${lastName}`, 10, 10);

    let programContent = document.querySelectorAll('.table');
    let yPos = 30;

    // Itera attraverso le tabelle HTML
    programContent.forEach((table, index) => {
        let rows = table.querySelectorAll('tr');
        doc.setFontSize(14);
        doc.text(`Scheda ${String.fromCharCode(65 + index)}`, 10, yPos);
        yPos += 10;

        rows.forEach(row => {
            let cells = row.querySelectorAll('td');
            doc.setFontSize(12);
            cells.forEach(cell => {
                doc.text(cell.textContent, 10, yPos);
                yPos += 10;
            });
        });

        yPos += 10; // Spazio tra schede
    });

    doc.save("scheda-allenament.pdf");
});

    let program = [];

    // Definisce il numero di esercizi in base alla durata
    let exerciseCount;
    if (duration === 1) { // 1 ora
        exerciseCount = 5;
    } else if (duration === 1.5) { // 1 ora e mezza
        exerciseCount = 8;
    } else { // Più di 2 ore
        exerciseCount = 12;
    }

    if (trainingType === "totalBody") {
        // Total body per ogni giorno, numero di esercizi dipendente dalla durata
        for (let i = 0; i < days; i++) {
            let day = {
                title: `Scheda ${String.fromCharCode(65 + i)}`,
                exercises: exercises.totalBody.slice(0, exerciseCount)
            };
            program.push(day);
        }
    } else {
        // Split routine in base ai giorni, con il numero corretto di esercizi
        let routineDays = Object.keys(exercises.splitRoutine);
        for (let i = 0; i < days; i++) {
            let day = {
                title: `Scheda ${routineDays[i]}`,
                exercises: exercises.splitRoutine[routineDays[i]].slice(0, exerciseCount)
            };
            program.push(day);
        }
    }

    return program;
}

    // Funzione per generare il contenuto HTML della scheda
    function generateProgramHTML(program) {
        let html = "";
        program.forEach(day => {
            html += `<h3>${day.title}</h3>`;
            html += '<table class="table">';
            day.exercises.forEach(exercise => {
                html += `<tr><td>${exercise}</td></tr>`;
            });
            html += "</table>";
        });
        return html;
    }

    // Funzione per scaricare la scheda come PDF
    downloadPDF.addEventListener("click", function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Aggiunge il titolo con nome e cognome
        doc.setFontSize(18);
        doc.text(`Programma di allenamento di ${firstName} ${lastName}`, 10, 10);

        let programContent = document.querySelectorAll('.table');
        let yPos = 30;

        // Itera attraverso le tabelle HTML
        programContent.forEach((table, index) => {
            let rows = table.querySelectorAll('tr');
            doc.setFontSize(14);
            doc.text(`Scheda ${String.fromCharCode(65 + index)}`, 10, yPos);
            yPos += 10;

            rows.forEach(row => {
                let cells = row.querySelectorAll('td');
                doc.setFontSize(12);
                cells.forEach(cell => {
                    doc.text(cell.textContent, 10, yPos);
                    yPos += 10;
                });
            });

            yPos += 10; // Spazio tra schede
        });

        doc.save("scheda-allenamento.pdf");
    });

    // Funzione per tornare alla schermata di modifica
    modifyProgram.addEventListener("click", function() {
        trainingProgram.classList.remove("active");
        formStep2.classList.add("active");
    });
});

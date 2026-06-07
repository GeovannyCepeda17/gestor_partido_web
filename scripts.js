// Variables del marcador
const puntsBarca = document.getElementById('nosaltres');
const puntsMadrid = document.getElementById('contrari');
const missatge = document.getElementById('missatge');
const botoReset = document.getElementById('reset');

let scoreBarca = 0;
let scoreMadrid = 0;



// Variables jugadors
const inputNom = document.getElementById('nom');
const formAfegir = document.getElementById('afegir');
const llistaJugadors = document.getElementById('llista');

let jugadors = [];

// Funció per mostrar missatge temporal
function mostrarMissatge(texte) {
    missatge.textContent = texte;
    setTimeout(() => {
        missatge.textContent = "";
    }, 3000);
}

// Actualitza estat del partit 
function actualitzaEstat() {
    if (scoreBarca > scoreMadrid) {
        mostrarMissatge("Guanya el Barça!");
    } else if (scoreMadrid > scoreBarca) {
        mostrarMissatge("Guanya el Madrid...");
    } else {
        mostrarMissatge("Empat");
    }
}



// Botons sumar punts
document.querySelectorAll('.suma').forEach(boto => {
    boto.addEventListener('click', () => {
        const punts = Number(boto.dataset.punts);

        if (boto.closest('.casa')) {
            scoreBarca += punts;
            puntsBarca.textContent = scoreBarca;
        } else {
            scoreMadrid += punts;
            puntsMadrid.textContent = scoreMadrid;
        }

        mostrarMissatge("Punt afegit!");
        actualitzaEstat();
    });
});

// Reset marcador
botoReset.addEventListener('click', () => {
    if (confirm("Segur que vols posar el marcador a zero?")) {
        scoreBarca = 0;
        scoreMadrid = 0;
        puntsBarca.textContent = 0;
        puntsMadrid.textContent = 0;
        mostrarMissatge("Marcador reiniciat");
        actualitzaEstat();
    }
});



// Afegir jugador 
function afegirJugador(nom) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const btnEliminar = document.createElement('button');

    span.textContent = nom;
    btnEliminar.textContent = "X";
    btnEliminar.type = "button";

    btnEliminar.addEventListener('click', () => {
        li.remove();
        mostrarMissatge(`Eliminat: ${nom}`);
    });

    li.appendChild(span);
    li.appendChild(btnEliminar);
    llistaJugadors.appendChild(li);
}



// Formulari jugadors
formAfegir.addEventListener('submit', e => {
    e.preventDefault();

    const nom = inputNom.value.trim();

    if (nom === "") {
        mostrarMissatge("Escriu un nom!");
        return;
    }

    const existeix = jugadors.some(j => j.toLowerCase() === nom.toLowerCase());

    if (existeix) {
        mostrarMissatge("Aquest jugador ja està!");
        return;
    }

    jugadors.push(nom);
    afegirJugador(nom);
    mostrarMissatge(`Afegit: ${nom}`);
    inputNom.value = "";
});
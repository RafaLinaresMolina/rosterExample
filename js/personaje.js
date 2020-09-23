/* 

Queremos hacer un juego en el que 2 Personajees se enfrentan 

#Personaje

    Que propiedades deberia tener?
    - nombre
    - puntos de vida
    - armadura
    - ataque

    Que puede hacer?
    - Recibir daño

    Cuando acaba la partida?
    - La vida de uno de los 2 llega a 0.

*/

class Personaje {
  //Constructor basico del personaje
  constructor(name, hp, armor, dmg) {
    this.name = name;
    this.hp = hp;
    this.armor = armor;
    this.dmg = dmg;
  }

  // Funcion Recibir Daño
  /*
        Aqui interpretamos que el daño, por una parte se mitiga con la armadura
        Por otra parte, para darle algo de dinamismo, como en el famoso juego de
        Rol D&D, comprobamos que si nos da un 20, es un critico y hace el doble 
        de daño, mientras que si es un 1, sera un fallo automatico.
    */
  recibeDmg = (dmg) => {
    const tirada = tirarDado();
    if (tirada === 20) {
      console.log("\tCRITICAL HIT! " + dmg * 2);
      this.hp -= dmg * 2 - this.armor;
    } else if (tirada === 1) {
      console.log("\tHAS FALLADO!");
    } else {
      console.log("\tGOLPE NORMAL " + (dmg - this.armor));
      this.hp -= dmg - this.armor;
    }
  };
}

// Nuestro tirador de dados
const min = 1;
const max = 20;
const tirarDado = () => Math.floor(Math.random() * (max - min + min)) + 1;

//Elementos del HTML que vamos a modificar
const rosterElement = document.getElementById("roster");
const selectedElement = document.getElementById("selected");

selectedElement.innerHTML = "";

// - Personajes de ejemplo
const pers1 = new Personaje("Guerrero", 100, 10, 15);
const pers2 = new Personaje("Paladin", 12, 5, 15);
const pers3 = new Personaje("Mago", 60, 0, 35);
const pers4 = new Personaje("Picaro", 80, 5, 20);
const pers5 = new Personaje("Arquero", 100, 5, 15);
const pers6 = new Personaje("Monje", 100, 10, 15);
const pers7 = new Personaje("Anti-Paladin", 100, 5, 15);
const pers8 = new Personaje("Mercader", 150, 5, 7);
const pers9 = new Personaje("Inquisidor", 100, 5, 15);

//Se almacenan en un array para recorrerlos y pintarlos
let arrayPJ = [pers1, pers2, pers3, pers4, pers5, pers6, pers7, pers8, pers9];

//Array para almacenar los PJ seleccionados
let arrySeleccionados = [];
const maximaSeleccionDePJ = 2;

//Los dos favoritos del publico que aun no sabemos
let pjSelec1;
let pjSelec2;

// Variable en la que almacenaremos el contenido HTML a mostrar
let infoRoster = "";

// Funcion pintar roster
/* 
    Aqui la idea es leer del array cada personaje y pintarlo en pantalla.
    para ello, usamos el string literal en el que insertamos la info que queremos
*/
const pintarRoster = () => {
  for (let pos in arrayPJ) {
    infoRoster += `<div class="pj" id="pj${pos}" onclick="selectPJ(${parseInt(
      pos
    )})" > <div class="text">Name: ${
      arrayPJ[pos].name
    } </div> <div class="text">HP: ${
      arrayPJ[pos].hp
    }</div> <div class="text">Armor: ${
      arrayPJ[pos].armor
    }</div> <div class="text">Damage: ${arrayPJ[pos].armor}</div> </div>`;
  }
  rosterElement.innerHTML = infoRoster;
};

pintarRoster();

// Esta funcion lo que hace es recorrer el array de seleccionados y pintarlos en el HTML
const pintarSeleccionados = () => {
  let infoSelected = "";
  for (let character of arrySeleccionados) {
    infoSelected += `<div class="pj"> <div class="text">Name: ${character.name} </div> <div class="text">HP: ${character.hp}</div> <div class="text">Armor: ${character.armor}</div> <div class="text">Damage: ${character.armor}</div> </div>`;
  }
  selectedElement.innerHTML = infoSelected;
};

/*
    Funcion para el onClick, se le pasas como parametro la posicion en la que esta el PJ
*/
const selectPJ = (pos) => {
  // Solo seleccionamos mientras no superemos el limite
  if (arrySeleccionados.length < maximaSeleccionDePJ) {
    arrySeleccionados.push(arrayPJ[parseInt(pos)]);

    //Como ya lo tenemos seleccionado, no queremos que se vuelva a seleccionar
    document.getElementById("pj" + pos).style.pointerEvents = "none";
    document.getElementById("pj" + pos).style.backgroundColor = "grey";

    pintarSeleccionados();

    asignarParaPelear();
  }
};

// Funcion que nos pasa a las variables deseadas el objeto de los personajes
/* 
    *** Nota, realmente podriamos usar directamente el array de seleccionados, 
    pero esta es otra forma valida 
    */
const asignarParaPelear = () => {
  if (arrySeleccionados[0]) {
    pjSelec1 = arrySeleccionados[0];
  }

  if (arrySeleccionados[1]) {
    pjSelec2 = arrySeleccionados[1];
  }
};

// Funcion para simular la batalla, ira en el onclick del button Luchar
const simularBatalla = () => {

    //Sin PJ seleccionados no hay pelea
    if(!pjSelec1 || !pjSelec2){
        alert('Debes seleccionar personajes')
    } else {
        while (pjSelec1.hp > 0 && pjSelec2.hp > 0) {
        console.log(`Personaje ${pjSelec1.name} ataca a ${pjSelec2.name}`);
        console.log(
          `\t${pjSelec1.name} tiene ${pjSelec1.hp} / ${pjSelec2.name} tiene ${pjSelec2.hp}`
        );
      
        pjSelec1.recibeDmg(pjSelec2.dmg);
      
        console.log(
          `${pjSelec1.name} tiene ${pjSelec1.hp} / ${pjSelec2.name} tiene ${pjSelec2.hp}`
        );
      
        console.log(`Personaje ${pjSelec2.name} ataca a ${pjSelec1.name}`);
        console.log(
          `\t${pjSelec1.name} tiene ${pjSelec1.hp} / ${pjSelec2.name} tiene ${pjSelec2.hp}`
        );
      
        pjSelec2.recibeDmg(pjSelec1.dmg);
      
        console.log(
          `\t${pjSelec1.name} tiene ${pjSelec1.hp} / ${pjSelec2.name} tiene ${pjSelec2.hp}`
        );
      }
      
      // Anunciamos campeon
      pjSelec1.hp === 0
        ? console.log(`${pjSelec2.name} Ha ganado`)
        : console.log(`${pjSelec1.name} Ha ganado`);
    }
    
}



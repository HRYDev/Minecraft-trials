class question {
    constructor(question, alternatives, answer) {
        this.question = question;
        this.alternatives = alternatives;
        this.answer = answer;
    }
}

var questions = [
    new question("Qual o nome da dimensão onde o jogador surge quando começa sua aventura?", [ "End", "Overworld", "Nether", "Aether" ], 2),
    new question("O que se usa para domar um lobo?", [ "Um osso", "Uma carne assada", "Uma carne podre", "Um laço" ], 1),
    new question("Fabrique uma picareta de ferro", [], 23),
    new question(
        "Qual é a progressão de materiais para ferramentas?",[
            "Madeira, Ferro, Pedra, Netherita, Diamante, Ouro",
            "Madeira, Pedra, Ferro, Diamante, Ouro, Netherita",
            "Madeira, Pedra, Ferro, Ouro, Diamante, Netherita",
            "Pedra, Ferro, Ouro, Esmeralda, Diamante, Netherita"
        ], 3),
    new question("Quanto tempo dura uma noite em tempo real?", ["18 minutos", "12 minutos", "5 minutos", "7 minutos"], 4),
    new question("Fabrique uma espada de diamante", [], 27),
    new question("Qual a quantidade mínima de obsidiana nescessária para criar um portal do Nether?", ["12 Obsidianas", "10 Obsidianas", "6 Obsidianas", "14 Obsidianas"], 2),
    new question("Qual item é ultilizado para localizar uma fortaleza?", ["Olho do Ender", "Bússola", "Perolas de Ender", "Coração do Mar"], 1),
    new question("Qual é o nome do mob mais resistente?", ["Dragão do Ender", "Wither", "Guardião", "Warden"], 4),
    new question("Fabrique uma fornalha", [], 10),
]

var corrects = 0, activeQuestion = 0;
var indicators = new Array(10), checkboxes = new Array(4), labels = new Array(4);
var questionBox = document.getElementById("question");
var submit = document.getElementById("submit");
submit.addEventListener("click", Submit);

for(let index = 0; index < 10; index++) {
    indicators[index] = document.getElementById("led" + (index + 1));
    indicators[index].style = "border-style: inset";
}

for (let index = 0; index < 4; index++) {
    checkboxes[index] = document.getElementById("answer" + (index + 1).toString());
    labels[index] = document.getElementById("label" + (index + 1).toString());
}

function Shuffle() {
    let currentIndex = questions.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--;
        [questions[currentIndex], questions[randomIndex]] = [questions[randomIndex], questions[currentIndex]];
    }
}

function LoadQuestion() {
    if(activeQuestion < 10) {
        questionBox.innerHTML = questions[activeQuestion].question;
        if(questions[activeQuestion].alternatives.length > 0) {
            document.getElementById("alternatives").style = "";
            document.getElementById("craft").style = "display: none";
            for(let index = 0; index < labels.length; index++) {
                checkboxes[index].checked = false;
                labels[index].innerHTML = questions[activeQuestion].alternatives[index];
            }
        } else {
            ResetInventory();
            document.getElementById("craft").style = "";
            document.getElementById("alternatives").style = "display: none";
        }
    } else {
        document.getElementById("craft").style = "display: none";
        document.getElementById("alternatives").style = "display: none";
        document.getElementById("submit").style = "display: none; align-self: center";
        questionBox.innerHTML = questions[activeQuestion] = "Parabens! Você acertou " + corrects + " questões!";
    }
}

function Submit() {
    if(questions[activeQuestion].alternatives.length > 0) {
        for(let index = 0; index < checkboxes.length; index++) {
            if(checkboxes[index].checked) {
                if(index + 1 == questions[activeQuestion].answer) {
                    indicators[activeQuestion].style = "background-color: #52a535; color: white";
                    new Audio("../resources/sounds/success.ogg").play();
                    corrects++;
                } else {
                    indicators[activeQuestion].style = "background-color: #c01800; color: white";
                    new Audio("../resources/sounds/wrong.ogg").play();
                } activeQuestion++; LoadQuestion();
            }
        }
    } else {
        if(Search(questions[activeQuestion].answer)){
            indicators[activeQuestion].style = "background-color: #52a535; color: white;";
            new Audio("../resources/sounds/success.ogg").play();
            corrects++;
        } else {
            indicators[activeQuestion].style = "background-color: red; color: white;";
            new Audio("../resources/sounds/wrong.ogg").play();
        } activeQuestion++; LoadQuestion();
    }
}

function Tick() { new Audio("../resources/sounds/click.mp3").play(); }
document.getElementById("permission").addEventListener("click", ()=> {
    var music = document.getElementById("audio");
    music.src = "../resources/sounds/music/bg" + (Math.floor(Math.random() * 3) + 1) + ".ogg";
    music.volume = 0.05; music.play(); Tick();
})
Shuffle(); LoadQuestion();
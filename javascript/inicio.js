let v1 = document.getElementById("v1");
let v2 = document.getElementById("v2");
let v3 = document.getElementById("v3");

function infonova(i){

        if (i == 1){
            document.getElementById("infocor").src="../resources/images/infovideo/Como Funciona o Sistema de Coordenadas no Minecraft.png";
            document.getElementById("infocor").width = 1000;
            document.getElementById("infocor").height = 4000;
        }

        if (i == 2){
            document.getElementById("infocor").src="../resources/images/infovideo/Os Melhores Alimentos no Minecraft.png";
            document.getElementById("infocor").width = 1000;
            document.getElementById("infocor").height = 4000;
        }

        if(i == 3){
            document.getElementById("infocor").src="../resources/images/infovideo/Guia Completo de Mineração no Minecraft.png";
            document.getElementById("infocor").width = 1000;
            document.getElementById("infocor").height = 4000;
        }

}
    
function nether() {
document.body.style.transition = "1s";
document.body.style.backgroundImage = "url('../resources/images/netherrack.jpg')";
document.getElementById("neterrblock").src = "../resources/images/Netherrack_block.png"
document.getElementById("neterrblock").style.transition = "1s";
document.getElementById("neterrblock").width = 37;
document.getElementById("neterrblock").height = 37;
    
document.getElementById("fundo").style.opacity = 0;
document.getElementById("introduçao").style.padding = 30;

}

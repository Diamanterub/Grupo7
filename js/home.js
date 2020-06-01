// Slideshow para a página Home //
onload = start;
function start(){	
    var i = 1;
    function Move(){ 	
        i = (i%4)+1; // 4 é o número de slides que a página tem //
        document.getElementById('i'+i).checked = true;
    }
    setInterval(Move,10000); // Altera o slide a cada 10 segundos //
    }

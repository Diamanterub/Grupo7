// Slideshow para a página Home //
onload = start;
function start(){	
    var i = 1;
    function Move(){
        document.getElementById('i1').checked ? i = 1 : {} ;
        document.getElementById('i2').checked ? i = 2 : {} ;
        document.getElementById('i3').checked ? i = 3 : {} ;
        document.getElementById('i4').checked ? i = 4 : {} ;
        i = (i%4)+1; // 4 é o número de slides que a página tem //
        document.getElementById('i'+i).checked = true;
    }
    setInterval(Move,10000); // Altera o slide a cada 10 segundos //
}

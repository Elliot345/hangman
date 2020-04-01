var ctx = document.getElementById('canvas').getContext('2d');
var canvas = document.getElementById('canvas');
var phrase;
var guessed_letters = [];
var show_phrase;
var sub_letter;
var phrases = [
    'RISE AND FALL',
    'THE SUN IS BRIGHT',
    'SHOOT FOR THE STARS',
    'LATER BECOMES NEVER',
    'PLEASE STAND BY',
    'THE JIG IS UP',
    'GO FOR BROKE',
    'BACK TO SQUARE ONE',
    'FIGHT FIRE WITH FIRE'
];
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
function get_phrase() {
    phrase = phrases[Math.floor(Math.random() * phrases.length)];
    show_phrase = '';
    sub_letter = 0;
    for (var i = 0; i < phrase.length; i++) {
        if (phrase.charAt(i) == ' ') {
            show_phrase += '  ';
        } else {
            show_phrase += '_ ';
        }
    }
    return phrase, show_phrase;
}
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    ctx.font = font;
    var metrics = ctx.measureText(text);
    return metrics.width;
}
var phrase, show_phrase = get_phrase();
var text_size = getTextWidth('_', '35px Arial');
var x_sub = (getTextWidth(show_phrase, "35px Arial") / 2);
var sub = 80;
var alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.toUpperCase();
var lone = [false, false, false, false, false, false, false, false];
var ltwo = [false, false, false, false, false, false, false, false];
var lthree = [false, false, false, false, false, false, false, false];
alphabet = alphabet.split(' ');
var mouse_x = 0;
var mouse_y = 0;
var Y = false;
var Z = false;
var wrong = 0;
var head_radius = 20;
canvas.addEventListener("mousedown", function(event) {
    mouse_x = event.pageX - 250;
    mouse_y = event.pageY - 100;
}, false);
function lv(letter) {
    letter = letter.toUpperCase();
    if (letter == 'A') {
        return lone[0];
    } else if (letter == 'B') {
        return lone[1];
    } else if (letter == 'C') {
        return lone[2];
    } else if (letter == 'D') {
        return lone[3];
    } else if (letter == 'E') {
        return lone[4];
    } else if (letter == 'F') {
        return lone[5];
    } else if (letter == 'G') {
        return lone[6];
    } else if (letter == 'H') {
        return lone[7];
    } else if (letter == 'I') {
        return ltwo[0];
    } else if (letter == 'J') {
        return ltwo[1];
    } else if (letter == 'K') {
        return ltwo[2];
    } else if (letter == 'L') {
        return ltwo[3];
    } else if (letter == 'M') {
        return ltwo[4];
    } else if (letter == 'N') {
        return ltwo[5];
    } else if (letter == 'O') {
        return ltwo[6];
    } else if (letter == 'P') {
        return ltwo[7];
    } else if (letter == 'Q') {
        return lthree[0];
    } else if (letter == 'R') {
        return lthree[1];
    } else if (letter == 'S') {
        return lthree[2];
    } else if (letter == 'T') {
        return lthree[3];
    } else if (letter == 'U') {
        return lthree[4];
    } else if (letter == 'V') {
        return lthree[5];
    } else if (letter == 'W') {
        return lthree[6];
    } else if (letter == 'X') {
        return lthree[7];
    } else if (letter == 'Y') {
        return Y;
    } else if (letter == 'Z') {
        return Z;
    } else {
        return false;
    }
}
var won = false;
function update() {
    if (won == true || wrong == 6) {
        wait(1000);
    }
    for (var i = 0; i < 8; i++) {
        if (mouse_x > 20 + (35 * i) && mouse_x < (20 + (35 * i)) + 30 && mouse_y > 20 && mouse_y < 50 && lone[i] === false) {
            lone[i] = true;
            if (phrase.includes(alphabet[i]) === false) {
                wrong += 1;
            }
        }
        if (mouse_x > 20 + (35 * i) && mouse_x < (20 + (35 * i)) + 30 && mouse_y > 55 && mouse_y < 85 && ltwo[i] === false) {
            ltwo[i] = true;
            if (phrase.includes(alphabet[i + 8]) === false) {
                wrong += 1;
            }
        }
        if (mouse_x > 20 + (35 * i) && mouse_x < (20 + (35 * i)) + 30 && mouse_y > 90 && mouse_y < 125 && lthree[i] === false) {
            lthree[i] = true;
            if (phrase.includes(alphabet[i + 16]) === false) {
                wrong += 1
            }
        }
    }
    if (mouse_x > 20 && mouse_x < 50 && mouse_y > 125 && mouse_y < 155 && Y === false) {
        Y = true;
        if (phrase.includes('Y') === false) {
            wrong += 1
        }
    }
    if (mouse_x > 55 && mouse_x < 85 && mouse_y > 125 && mouse_y < 155 && Z === false) {
        Z = true;
        if (phrase.includes('Z') === false) {
            wrong += 1
        }
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 800, 400);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(424 - sub,45);
    ctx.lineTo(424 - sub, 250);
    ctx.moveTo(375 - sub, 250);
    ctx.lineTo(474 - sub, 250);
    ctx.moveTo(404 - sub, 65);
    ctx.lineTo(558 - sub, 65);
    ctx.moveTo(553 - sub, 65);
    ctx.lineTo(553 - sub, 100);
    ctx.stroke();
    ctx.font = "35px Arial";
    ctx.fillText(show_phrase, 400 - x_sub, 300);
    //alert(phrase);
    ctx.beginPath();
    ctx.lineWidth = 2;
    for (var i = 0; i < 8; i++) {
        //ctx.rect(20 + (i * 35), 20, 30, 30);
        ctx.fillText(alphabet[i], 23 + (i * 34.8), 50);
        //ctx.rect(20 + (i * 35), 55, 30, 30);
        ctx.fillText(alphabet[i + 8], 23 + (i * 34.8), 85);
        //ctx.rect(20 + (i * 35), 90, 30, 30);
        ctx.fillText(alphabet[i + 16], 23 + (i * 34.3), 120);
    }
    //ctx.rect(20, 125, 30, 30);
    //ctx.rect(55, 125, 30, 30);
    ctx.fillText('Y', 23, 155);
    ctx.fillText('Z', 57.3, 155);
    for (i = 0; i < 8; i++) {
        if (lone[i] === true) {
            ctx.moveTo(20 + (i * 35), 20);
            ctx.lineTo(50 + (i * 35), 50);
            ctx.stroke();
            ctx.moveTo(50 + (i * 35), 20);
            ctx.lineTo(20 + (i * 35), 50);
            ctx.stroke();
        }
        if (ltwo[i] === true) {
            ctx.moveTo(20 + (i * 35), 55);
            ctx.lineTo(50 + (i * 35), 85);
            ctx.stroke();
            ctx.moveTo(50 + (i * 35), 55);
            ctx.lineTo(20 + (i * 35), 85);
            ctx.stroke();
        }
        if (lthree[i] === true) {
            ctx.moveTo(20 + (i * 35), 90);
            ctx.lineTo(50 + (i * 35), 120);
            ctx.stroke();
            ctx.moveTo(50 + (i * 35), 90);
            ctx.lineTo(20 + (i * 35), 120);
            ctx.stroke();
        }
    }
    if (Y === true) {
        ctx.moveTo(20, 125);
        ctx.lineTo(50, 155);
        ctx.moveTo(50, 125);
        ctx.lineTo(20, 155);
        ctx.stroke();
    }
    if (Z === true) {
        ctx.moveTo(55, 125);
        ctx.lineTo(85, 155);
        ctx.moveTo(85, 125);
        ctx.lineTo(55, 155);
        ctx.stroke();
    }
    won = true;
    show_phrase = '';
    for (i = 0; i < phrase.length; i++) {
        if (phrase.charAt(i) == ' ') {
            show_phrase += '  ';
        } else if (lv(phrase.charAt(i)) === true) {
            show_phrase += phrase.charAt(i) + ' ';
        }
        else {
            show_phrase += '_ ';
            won = false
        }
    }
    if (wrong == 1) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(553 - 80, 100 + 20, 20, 0, 2 * Math.PI, false);
        ctx.stroke();
    } else if (wrong == 2) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(553 - 80, 100 + 20, 20, 0, 2 * Math.PI, false);
        ctx.moveTo(553 - 80, 140)
        ctx.lineTo(553 - 80, 200)
        ctx.stroke();
    } else if (wrong == 3) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(553 - 80, 100 + 20, 20, 0, 2 * Math.PI, false);
        ctx.moveTo(553 - 80, 140)
        ctx.lineTo(553 - 80, 200)
        ctx.lineTo(553 - 100, 240)
        ctx.stroke();
    } else if (wrong == 4) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(553 - 80, 100 + 20, 20, 0, 2 * Math.PI, false);
        ctx.moveTo(553 - 80, 140)
        ctx.lineTo(553 - 80, 200)
        ctx.lineTo(553 - 100, 240)
        ctx.moveTo(553 - 80, 200)
        ctx.lineTo(553 - 60, 240)
        ctx.stroke();
    } else if (wrong == 5) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(553 - 80, 100 + 20, 20, 0, 2 * Math.PI, false);
        ctx.moveTo(553 - 80, 140)
        ctx.lineTo(553 - 80, 200)
        ctx.lineTo(553 - 100, 240)
        ctx.moveTo(553 - 80, 200)
        ctx.lineTo(553 - 60, 240)
        ctx.moveTo(553 - 80, 160)
        ctx.lineTo(553 - 100, 200)
        ctx.stroke();
    } else if (wrong == 6) {
        ctx.font = '150px Arial'
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'white'
        ctx.fillRect(0, 0, 800, 400)
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'black'
        ctx.fillText('You Lose', 400 - (getTextWidth('You Lose', '150px Arial') / 2), 150);
        ctx.font = '35px Arial';
        ctx.fillText(phrase, 400 - (getTextWidth(phrase, '35px Arial') / 2), 300);
        ctx.stroke()
        location.replace('https://javascript-games.000webhostapp.com/Hang_Man.html')
    }
    if (won == true) {
        ctx.font = '150px Arial'
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'white'
        ctx.fillRect(0, 0, 800, 400)
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'black'
        ctx.fillText('You Win', 400 - (getTextWidth('You Win', '150px Arial') / 2), 150);
        ctx.font = '35px Arial';
        ctx.fillText(show_phrase, 400 - x_sub, 300);
        ctx.stroke()
        location.replace('https://javascript-games.000webhostapp.com/Hang_Man.html')
    }
}
setInterval(update, 1);
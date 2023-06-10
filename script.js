var jet = document.getElementById("jet");
var board = document.getElementById("board");

let shoot = new Audio('shoot.mp3');
let gameover = new Audio('gameover.mp3');
shoot.volume = 0.5;
gameover.volume = 0.5;

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
  }
  else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      shoot.play();
      var aliens = document.getElementsByClassName("aliens");

      for (var i = 0; i < aliens.length; i++) {
        var alien = aliens[i];
        if (alien != undefined) {
          var alienbound = alien.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();
          if (
            bulletbound.top <= alienbound.top &&
            bulletbound.bottom <= alienbound.bottom &&
            bulletbound.left >= alienbound.left &&
            bulletbound.right <= alienbound.right 
          ) {
            alien.parentElement.removeChild(alien);
            document.getElementById("score").innerHTML =
              parseInt(document.getElementById("score").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; 
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

var generaterocks = setInterval(() => {
  var alien = document.createElement("div");
  alien.classList.add("aliens");
  var alienleft = parseInt(
    window.getComputedStyle(alien).getPropertyValue("left")
  );
  alien.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(alien);
}, 1000);

var movealiens = setInterval(() => {
  var aliens = document.getElementsByClassName("aliens");

  if (aliens != undefined) {
    for (var i = 0; i < aliens.length; i++) {
      var alien = aliens[i];
      var alientop = parseInt(
        window.getComputedStyle(alien).getPropertyValue("top")
      );
      if (alientop >= 475) {
        gameover.play();
        alert("Game Over");
        clearInterval(movealiens);
        window.location.reload();
      }

      alien.style.top = alientop + 25 + "px";
    }
  }
}, 450);
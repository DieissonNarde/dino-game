const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyup(event) {
  if(event.keyCode === 32) {
    if(!isJumping) {
      jump()
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if(position >= 100) {
      clearInterval(upInterval);

      // Descendo
      let downInterval = setInterval(() => {
        if(position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 90;
          dino.style.bottom = position + 'px';
        }
      }, 260);
    } else {
      // Subindo
      position += 90;
      dino.style.bottom = position + 'px';
    }
  }, 60);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if(cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if(cactusPosition > 0 && cactusPosition < 50 && position < 50) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo<h1>';
    } else {
      cactusPosition -= 6;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyup);
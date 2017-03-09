var monsterHitInterval;
var closeLost = document.getElementsByClassName("closeLost")[0];
var closeWin = document.getElementsByClassName("closeWin")[0];
var modalLost = document.getElementById('lostModal');
var modalWin = document.getElementById('winModal');

new Vue({
	el: "#app",
  data: {
  	logs: [],
    monsterHealth: 100,
    playerHealth: 100,
    gameGoingOn: false,
    gameEnded: false,
    lastSpecial: 0,
    monsterLastDamage: 0,
    playerLastDamage: 0,
    playerLastHeal: 0,
    lastHealTime: 0
  },
  methods: {
    startGame() {
      this.gameGoingOn = true;
      monsterHitInterval = setInterval(() => {
        const vm = this;
        if (vm.gameGoingOn) {
          vm.playerLastDamage = randomNumber(7, 10);
          vm.playerHealth -= vm.playerLastDamage;
          vm.logs.push({
            date: new Date(),
            playerTurn: false,
            description: `Monster hit you ${ vm.playerLastDamage }`
          });
        }
      }, 300);
    },
  	normalAttack() {
    	//player turn
      this.monsterLastDamage = randomNumber(1, 10);
      this.monsterHealth -= this.monsterLastDamage;
      this.logs.push({
        date: new Date(),
        playerTurn: true,
        description: `You hit the monster ${ this.monsterLastDamage }`
      });
    },
    specialAttack() {
      this.lastSpecial = new Date();
      setTimeout(() => {
        this.lastSpecial = 0;
      }, 3000);
    	//player turn
      this.monsterLastDamage = randomNumber(10, 20);
      this.monsterHealth -= this.monsterLastDamage;
      this.logs.push({
        date: new Date(),
        playerTurn: true,
        description: `You special hit the monster ${ this.monsterLastDamage }`
      });
    },
    heal() {
      this.lastHealTime = new Date();
      setTimeout(() => {
        this.lastHealTime = 0;
      }, 3000);
      this.playerLastHeal = randomNumber(20, 25);
      this.playerHealth += this.playerLastHeal;
      this.logs.push({
        date: new Date(),
        playerTurn: true,
        description: `You heal ${ this.playerLastHeal }`
      });
      setTimeout(() => {
        this.playerLastHeal = 0;
      }, 3000);
    },
    giveUp() {
    	this.monsterHealth = 100;
     	this.playerHealth = 100;
      this.gameGoingOn = false;
      this.lastSpecial = 0;
      this.logs = [];
      this.monsterLastDamage = 0;
      this.playerLastDamage = 0;
      this.playerLastHeal = 0;
      this.lastHealTime = 0;
      this.gameEnded = false;
      clearTimeout(monsterHitInterval);
    }
  },
  watch: {
    playerHealth: function(val) {
      var vm = this;
      if (val < 0) {
        modalLost.style.display = "block";
        vm.gameEnded = true;
        clearTimeout(monsterHitInterval);
      }
    },
    monsterHealth: function(val) {
      var vm = this;
      if (val < 0) {
        modalWin.style.display = "block";
        vm.gameEnded = true;
        clearTimeout(monsterHitInterval);
      }
    }
  }
});

function randomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

// When the user clicks on <span> (x), close the modal
closeLost.onclick = function() {
  modalLost.style.display = "none";
}

closeWin.onclick = function() {
  modalWin.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalLost || event.target == modalWin) {
    modalLost.style.display = "none";
    modalWin.style.display = "none";
  }
}
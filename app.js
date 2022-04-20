const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null
    }
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + '%' }
    },
    playerBarStyles() {
      return { width: this.playerHealth + '%' }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0
    },
    mayUseHealPlayer() {
      return this.currentRound % 3 !== 0
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // player lost
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // monster lost
        this.winner = 'player'
      }
    }
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth -= attackValue
      this.currentRound++
      this.attackPlayer()
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15)
      this.playerHealth -= attackValue
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth -= attackValue
      this.currentRound++
      this.attackPlayer()
    },
    healPlayer() {
      const healthValue = getRandomValue(8, 20)
      if (this.playerHealth + healthValue > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += healthValue
      }
      this.currentRound++
      this.attackPlayer()
    }
  }
})

app.mount('#game')

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
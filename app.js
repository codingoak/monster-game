const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0
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
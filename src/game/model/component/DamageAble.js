export default class DamageAble {
  takeDamage (amount) {
    this.hp -= amount
    console.log('Player took damage')
  }
}

import InputManager, { Actions } from './InputManager'
import AssetManager, { AssetType } from './AssetManager'
import Animation from '../graphics/2D/Animation'
import { EntityType } from '../../lib/interfaces/Collideable'
import Observer from '../../lib/observer/Observer'
import Settings from '../../game/model/Settings'
import Remote from './Remote'
import Player from '../../game/model/Player'
import Dimension from '../graphics/2D/Dimension'

/**
 * Quest for nothing game client main class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class GameClient implements Observer {
  playerId: string
  private dimension: Dimension
  private readonly ctx: CanvasRenderingContext2D
  private readonly backgroundContext: CanvasRenderingContext2D
  private inputManager: InputManager
  private assetManager: AssetManager
  private spritesLoaded: boolean
  private animations: {
    right: Animation
    left: Animation
    idle: Animation
    coin: Animation
    current: Animation
  }
  private state: any
  private settings: Settings

  /**
   * Constructor. Initializes the game client.
   *
   * @param remote Remote server reference
   * @param dimension
   * @param context
   * @param backgroundContext
   */
  constructor (
    remote: Remote,
    dimension: Dimension,
    context: CanvasRenderingContext2D,
    backgroundContext: CanvasRenderingContext2D
  ) {
    this.settings = new Settings()
    this.dimension = dimension
    this.ctx = context
    this.backgroundContext = backgroundContext
    this.inputManager = new InputManager(this.settings)
    this.inputManager.register(remote)
    this.inputManager.register(this)
    this.assetManager = new AssetManager()
    this.spritesLoaded = false
    this.init()
  }

  init (): void {
    // Add all sprites and music files to the download queue
    this.assetManager.queueDownload(EntityType.MAIN_THEME, 'assets/audio/ambient/ambient.mp3', AssetType.AUDIO)
    this.assetManager.queueDownload(EntityType.JUMP, 'assets/audio/effects/jump.wav', AssetType.AUDIO)
    this.assetManager.queueDownload(EntityType.BACKGROUND, 'assets/textures/background.png', AssetType.SPRITE)
    this.assetManager.queueDownload(EntityType.PLAYER, 'assets/textures/player.png', AssetType.SPRITE)
    this.assetManager.queueDownload(EntityType.STONE, 'assets/textures/stone-block.jpg', AssetType.SPRITE)
    this.assetManager.queueDownload(EntityType.HEART, 'assets/textures/heart.png', AssetType.SPRITE)
    this.assetManager.queueDownload(EntityType.COIN, 'assets/textures/coin.png', AssetType.SPRITE)
    this.assetManager.queueDownload(
      EntityType.PLAYER_SHEET,
      'assets/textures/test.png',
      AssetType.SPRITE_SHEET,
      {
        frameWidth: 32,
        frameHeight: 64
      }
    )
    this.assetManager.queueDownload(
      EntityType.COIN_SHEET,
      'assets/textures/coin-sprite-animation-sprite-sheet.png', AssetType.SPRITE_SHEET,
      {
        frameWidth: 44,
        frameHeight: 44
      }
    )
    this.assetManager.downloadAll(() => {
      const playerSheet = this.assetManager.getSpriteSheet(EntityType.PLAYER_SHEET)
      const coinSheet = this.assetManager.getSpriteSheet(EntityType.COIN_SHEET)
      const rightAnimation = new Animation(playerSheet, 3, 3, 6, 12)
      const leftAnimation = new Animation(playerSheet, 3, 3, 6, 12)
      const idleAnimation = new Animation(playerSheet, 10, 0, 2, 12)
      const coinAnimation = new Animation(coinSheet, 3, 0, 9)

      this.animations = {
        right: rightAnimation,
        left: leftAnimation,
        idle: idleAnimation,
        coin: coinAnimation,
        current: leftAnimation
      }
      // Play ambient sound
      this.assetManager.getSound(EntityType.MAIN_THEME, AssetType.AUDIO_LOOP).play(true)
      // Draw Background only once to improve performance
      this.backgroundContext.drawImage(
        this.assetManager.getSprite(EntityType.BACKGROUND),
        0,
        0,
        this.dimension.width,
        this.dimension.height
      )
      // make sure that all sprites needed for drawing are downloaded
      this.spritesLoaded = true
      this.loop()
    })
  }

  update (state: any): void {
    this.state = state
  }

  loop (): void {
    this.inputManager.notify()
    // Request new frame when ready. Allows the game to play in a loop in approximately 60fps
    window.requestAnimationFrame(() => this.loop())
  }

  /**
   * Draw all objects.
   * @param {Player[]} players player objects with objects within their viewport
   */
  render (players: Player[]): void {
    let currentPlayer = players.find(player => player.id === this.playerId)

    if (currentPlayer) {
      if (this.playerId && currentPlayer && this.spritesLoaded) {
        if (this.state[Actions.UP] || this.state[Actions.JUMP]) {
          // Check if players is not already jumping
          if (!currentPlayer.jumping && currentPlayer.grounded) {
            this.assetManager.getSound(EntityType.JUMP, AssetType.AUDIO).play()
          }
        }
        this.animations.current.update()
        this.animations.coin.update()
        this.ctx.clearRect(0, 0, this.dimension.width, this.dimension.height)
        players.forEach(player => {
          // Make sure to only draw players in the same area
          if (currentPlayer && player.viewport.areaId === currentPlayer.viewport.areaId) {
            if (player.registeredInputs[Actions.LEFT]) {
              this.animations.current = this.animations.left
            }
            if (player.registeredInputs[Actions.RIGHT]) {
              this.animations.current = this.animations.right
            }
            if (!player.registeredInputs[Actions.LEFT] && !player.registeredInputs[Actions.RIGHT]) {
              this.animations.current = this.animations.idle
            }
            this.animations.current.draw(this.ctx, player.position.x, player.position.y, player.width, player.height)
          }
        })
        // Draw all blocks
        currentPlayer.viewport.blocks.forEach(block => {
          if (block.type === EntityType.STONE) {
            this.ctx.drawImage(this.assetManager.getSprite(block.type), block.position.x, block.position.y, block.width, block.height)
          } else if (block.type === EntityType.COIN) {
            this.animations.coin.draw(this.ctx, block.position.x, block.position.y, block.width, block.height)
          }
        })
        // Display health
        let x = this.dimension.width - 35
        for (let i = 0; i < currentPlayer.lives; i++) {
          this.ctx.drawImage(this.assetManager.getSprite(EntityType.HEART), x, 5, 30, 30)
          x -= 30
        }
        this.ctx.drawImage(this.assetManager.getSprite(EntityType.COIN), 5, 5, 30, 30)
        this.ctx.font = '30px sans-serif'
        this.ctx.fillStyle = '#081966'
        this.ctx.fillText(currentPlayer.coins.toString(), 35, 30)
      }
    }
  }
}

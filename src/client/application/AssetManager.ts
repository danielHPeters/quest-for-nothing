import { EntityType } from '../../lib/interfaces/CollideAble'
import { Ajax } from '../../lib/Ajax'
import { SpriteSheet } from '../graphics/2D/SpriteSheet'
import { Sound } from './audio/Sound'

export enum AssetType {
  SPRITE = 'SPRITE', SPRITE_SHEET = 'SPRITE_SHEET', AUDIO = 'AUDIO', AUDIO_LOOP = 'LOOP'
}

export class AssetManager {
  audioContext
  cache
  queue
  downloadCount: number
  masterGain: GainNode
  effectsGain: GainNode
  ambientGain: GainNode

  /**
   *
   */
  constructor () {
    this.cache = {
      sprites: {},
      spriteSheets: {},
      audio: {}
    }
    this.downloadCount = 0
    this.queue = []
    this.initAudioContext()
  }

  initAudioContext (): void {
    try {
      this.audioContext = new AudioContext()
      this.masterGain = this.audioContext.createGain()
      this.effectsGain = this.audioContext.createGain()
      this.ambientGain = this.audioContext.createGain()
      this.masterGain.gain.value = 1
      this.masterGain.connect(this.audioContext.destination)
      this.effectsGain.connect(this.masterGain)
      this.ambientGain.connect(this.masterGain)
      this.ambientGain.gain.value = 1
      this.effectsGain.gain.value = 1
    } catch (e) {
      console.log('Web Audio API is not supported in this browser')
    }
  }

  adjustMasterVolume (value: number): void {
    this.masterGain.gain.value = value
  }

  adjustAmbientVolume (value: number): void {
    this.ambientGain.gain.value = value
  }

  adjustEffectsVolume (value: number): void {
    this.effectsGain.gain.value = value
  }

  /**
   *
   * @returns {boolean}
   */
  done (): boolean {
    return this.downloadCount === this.queue.length
  }

  /**
   *
   * @param {EntityType} id
   * @param {string} path
   * @param {AssetType} type
   * @param {{}} opts
   */
  queueDownload (id: EntityType, path: string, type: AssetType, opts = null): void {
    this.queue.push({
      id: id,
      path: path,
      type: type,
      opts: opts
    })
  }

  /**
   * Build an AJAX Request to loadAudioFromUrl audio file into the buffer cache.
   *
   * @param item object with name of file and path to file
   * @param callback function to execute on done
   */
  loadAudioFromUrl (item, callback): void {
    Ajax.create({
      method: 'GET',
      url: item.path,
      responseType: 'arraybuffer'
    }, response => {
      this.decodeAudio(response, item.id, callback)
    })
  }

  decodeAudio (data, id, callback): void {
    this.audioContext.decodeAudioData(data).then(
      buffer => {
        this.cache.audio[id] = buffer
        this.downloadCount += 1
        if (this.done()) {
          callback()
        }
      },
      error => { console.log('Error with decoding audio data' + error) }
    )
  }

  /**
   *
   * @param item
   * @param callback
   */
  loadSprite (item, callback): void {
    let sprite = new Image()
    sprite.addEventListener('load', () => {
      this.downloadCount++
      if (this.done()) {
        callback()
      }
    })
    sprite.src = item.path
    this.cache.sprites[item.id] = sprite
  }

  /**
   * Load sprites sheet.
   *
   * @param item sprite sheet info
   * @param callback called upon downloading all
   */
  loadSpriteSheet (item, callback): void {
    let spriteSheet = new Image()
    spriteSheet.addEventListener('load', () => {
      this.cache.spriteSheets[item.id] = new SpriteSheet(spriteSheet, item.opts.frameWidth || 0, item.opts.frameHeight || 0)
      this.downloadCount += 1
      if (this.done()) {
        callback()
      }
    })
    spriteSheet.src = item.path
  }

  /**
   *
   * @param callback
   */
  downloadAll (callback): void {
    this.queue.forEach(item => {
      if (item.type === AssetType.AUDIO) {
        this.loadAudioFromUrl(item, callback)
      } else if (item.type === AssetType.SPRITE) {
        this.loadSprite(item, callback)
      } else if (item.type === AssetType.SPRITE_SHEET) {
        this.loadSpriteSheet(item, callback)
      }
    })
  }

  /**
   * Create an audio buffer source node from cached buffer.
   * Send it to the destination of the audio context and play it.
   *
   * @param {EntityType} id file id
   * @param {AssetType} type
   */
  getSound (id: EntityType, type: AssetType): Sound {
    let gain
    if (type === AssetType.AUDIO) {
      gain = this.effectsGain
    } else {
      gain = this.ambientGain
    }
    return new Sound(this.audioContext, gain, this.cache.audio[id])
  }

  /**
   *
   * @param {string} id
   * @returns {EntityType}
   */
  getSprite (id: EntityType): any {
    return this.cache.sprites[id]
  }

  /**
   * Get sprite sheet by name.
   *
   * @param {EntityType} id
   * @returns {SpriteSheet}
   */
  getSpriteSheet (id: EntityType): SpriteSheet {
    return this.cache.spriteSheets[id]
  }
}

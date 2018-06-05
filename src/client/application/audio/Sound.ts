/**
 * Container for game sound files.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Sound {
  private audioContext: AudioContext
  private source: AudioBufferSourceNode
  private gainNode: GainNode
  private masterGain: GainNode
  private buffer
  private playing: boolean

  constructor (audioContext: AudioContext, masterGain: GainNode, buffer) {
    this.audioContext = audioContext
    this.masterGain = masterGain
    this.buffer = buffer
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = 0.2
    this.gainNode.connect(this.masterGain)
    this.playing = false
  }

  play (loop: boolean = false): void {
    this.source = this.audioContext.createBufferSource()
    this.source.buffer = this.buffer
    this.source.loop = loop
    this.source.connect(this.gainNode)
    this.source.start(0)
  }

  stop (): void {
    this.source.stop(0)
  }
}

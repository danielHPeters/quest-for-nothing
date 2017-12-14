export class Sound {
  audioContext: AudioContext
  source: AudioBufferSourceNode
  gainNode: GainNode
  masterGain: GainNode
  buffer
  playing: boolean

  constructor (audioContext, masterGain: GainNode, buffer) {
    this.audioContext = audioContext
    this.masterGain = masterGain
    this.buffer = buffer
    this.gainNode = this.audioContext.createGain()
    this.gainNode.gain.value = 0.2
    this.gainNode.connect(this.masterGain)
    this.playing = false
  }

  play (loop = false): void {
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

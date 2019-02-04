import * as chai from 'chai'
import Area from '../../../src/game/model/Area'
import Player from '../../../src/game/model/Player'

const should = chai.should()

describe('Area', () => {
  describe('#ckeckPlayers', () => {
    let area: Area
    let player: Player

    beforeEach(() => {
      area = new Area(
        'area1',
        new Area('area2'),
        new Area('area3'),
        new Area('area4'),
        new Area('area5')
      )
      player = new Player('p1', 10, 20, 50, 50, 'player', area)
      area.add(player)
    })

    it('should do nothing when player does not want to move', () => {
      area.checkPlayers()
      area.players[0].should.equal(player)
    })

    it('should move player to left area if player wants to go left', () => {
      area.players[0].edges.left = true
      area.checkPlayers()
      area.players.should.deep.equal([])
      // @ts-ignore
      area.left.players[0].should.equal(player)
    })

    it('should move player to right area if player wants to go right', () => {
      area.players[0].edges.right = true
      area.checkPlayers()
      area.players.should.deep.equal([])
      // @ts-ignore
      area.right.players[0].should.equal(player)
    })

    it('should move player to top area if player wants to go top', () => {
      area.players[0].edges.top = true
      area.checkPlayers()
      area.players.should.deep.equal([])
      // @ts-ignore
      area.top.players[0].should.equal(player)
    })

    it('should move player to bottom area if player wants to go bottom', () => {
      area.players[0].edges.bottom = true
      area.checkPlayers()
      area.players.should.deep.equal([])
      // @ts-ignore
      area.bottom.players[0].should.equal(player)
    })
  })

  describe('#left', () => {
    let area: Area
    let area2: Area

    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', area)
    })

    it('returns the left value', () => {
      // @ts-ignore
      area2.left.should.equal(area)
    })

    it('can be changed', () => {
      area2.left = undefined
      should.equal(area2.left, undefined)
    })
  })

  describe('#right', () => {
    let area: Area
    let area2: Area

    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', area)
    })

    it('returns the right value', () => {
      should.equal(area2.right, undefined)
    })

    it('can be changed', () => {
      area2.right = area
      area2.right.should.equal(area)
    })
  })

  describe('#top', () => {
    let area: Area
    let area2: Area

    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', undefined, undefined, area)
    })

    it('returns the right value', () => {
      // @ts-ignore
      area2.top.should.equal(area)
    })

    it('can be changed', () => {
      area2.top = undefined
      should.equal(area2.top, undefined)
    })
  })

  describe('#bottom', () => {
    let area: Area
    let area2: Area

    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', undefined, undefined, undefined, area)
    })

    it('returns the right value', () => {
      should.equal(area2.right, undefined)
      // @ts-ignore
      area2.bottom.should.equal(area)
    })

    it('can be changed', () => {
      area2.bottom = undefined
      should.equal(area2.bottom, undefined)
    })
  })
})

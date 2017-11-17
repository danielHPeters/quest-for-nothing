'use strict'
const chai = require('chai')
const Area = require('./../../../src/game/model/Area')
const Player = require('./../../../src/game/model/Player')
const should = chai.should()

describe('Area', () => {
  describe('#ckeckPlayers', () => {
    let area
    let player
    beforeEach(() => {
      area = new Area(
        'area1',
        new Area('area2'),
        new Area('area3'),
        new Area('area4'),
        new Area('area5')
      )
      player = new Player(10, 20, 50, 50, 'player', area)
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
      area.left.players[0].should.equal(player)
    })

    it('should move player to right area if player wants to go right', () => {
      area.players[0].edges.right = true
      area.checkPlayers()
      area.players.should.deep.equal([])
      area.right.players[0].should.equal(player)
    })

    it('should move player to top area if player wants to go top', () => {
      area.players[0].edges.top = true
      area.checkPlayers()
      area.players.should.deep.equal([])
      area.top.players[0].should.equal(player)
    })

    it('should move player to bottom area if player wants to go bottom', () => {
      area.players[0].edges.bottom = true
      area.checkPlayers()
      area.players.should.deep.equal([])
      area.bottom.players[0].should.equal(player)
    })
  })

  describe('#left', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', area)
    })

    it('returns the left value', () => {
      area2.left.should.equal(area)
    })

    it('can be changed', () => {
      area2.left = null
      should.equal(area2.left, null)
    })

    it('only accepts Area instance or null as values', () => {
      let func = () => {
        area2.left = 'area'
      }
      func.should.throw(Error)
    })
  })

  describe('#right', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', area)
    })

    it('returns the right value', () => {
      should.equal(area2.right, null)
    })

    it('can be changed', () => {
      area2.right = area
      area2.right.should.equal(area)
    })

    it('only accepts Area instance or null as values', () => {
      let func = () => {
        area2.right = 'area'
      }
      func.should.throw(Error)
    })
  })

  describe('#top', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', null, null, area)
    })

    it('returns the right value', () => {
      area2.top.should.equal(area)
    })

    it('can be changed', () => {
      area2.top = null
      should.equal(area2.top, null)
    })

    it('only accepts Area instance or null as values', () => {
      let func = () => {
        area2.top = 'area'
      }
      func.should.throw(Error)
    })
  })

  describe('#bottom', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', null, null, null, area)
    })

    it('returns the right value', () => {
      should.equal(area2.right, null)
      area2.bottom.should.equal(area)
    })

    it('can be changed', () => {
      area2.bottom = null
      should.equal(area2.bottom, null)
    })

    it('only accepts Area instance or null as values', () => {
      let func = () => {
        area2.bottom = 'area'
      }
      func.should.throw(Error)
    })
  })

  describe('#hasLeft', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', area)
    })

    it('should return true if not null', () => {
      area2.hasLeft().should.equal(true)
    })
    it('should return false if null', () => {
      area.hasLeft().should.equal(false)
    })
  })

  describe('#hasRight', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', null, area)
    })

    it('should return true if not null', () => {
      area2.hasRight().should.equal(true)
    })
    it('should return false if null', () => {
      area.hasRight().should.equal(false)
    })
  })

  describe('#hasTop', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', null, null, area)
    })

    it('should return true if not null', () => {
      area2.hasTop().should.equal(true)
    })
    it('should return false if null', () => {
      area.hasTop().should.equal(false)
    })
  })

  describe('#hasBottom', () => {
    let area
    let area2
    beforeEach(() => {
      area = new Area('area')
      area2 = new Area('area2', null, null, null, area)
    })

    it('should return true if not null', () => {
      area2.hasBottom().should.equal(true)
    })
    it('should return false if null', () => {
      area.hasBottom().should.equal(false)
    })
  })
})

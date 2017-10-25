'use strict'
const chai = require('chai')
const Area = require('./../../../src/game/model/Area')
const should = chai.should()

describe('Area', () => {
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
})

'use strict';
global.mocha = require('mocha');

let expect = require('chai').expect;

let colourUtils = require('../../src/common/utils/colour-utils');

describe('isHEXColour function', () => {
    describe('when given a valid HEX Code', () => {
        it('should return a correct true', function () {
            const HEX = 'AAB4CD';

            expect(colourUtils.isHEXColour(HEX)).to.be.eql(true);
        });
    });

    describe('when given an invalid HEX Code', () => {
        it('should return a correct false', function () {
            const HEX = 'A10CB4CD';

            expect(colourUtils.isHEXColour(HEX)).to.be.eql(false);
        });
    });

    describe('when given empty', () => {
        it('should return a correct false', function () {
            const HEX = '';

            expect(colourUtils.isHEXColour(HEX)).to.be.eql(false);
        });
    });

});

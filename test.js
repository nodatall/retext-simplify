/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:simplify
 * @fileoverview Test suite for `retext-simplify`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var retext = require('retext');
var simplify = require('./');

/*
 * Tests.
 */

test('simplify', function (t) {
    retext()
        .use(simplify)
        .process([
            'You can utilize a shorter word.',
            'Be advised, don’t do this.',
            'That’s the appropriate thing to do.'
        ].join('\n'), function (err, file) {
            t.ifError(err, 'should not fail (#1)');

            t.deepEqual(
                file.messages.map(String),
                [
                    '1:9-1:16: Replace “utilize” with “use”',
                    '2:1-2:11: Remove “Be advised”',
                    '3:12-3:23: Replace “appropriate” with “proper”, ' +
                    '“right”, or remove it'
                ],
                'should warn about simpler synonyms'
            );
        });

    t.end();
});

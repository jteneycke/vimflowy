/* globals describe, it */
import TestCase from '../testcase';

describe('go parent', function () {
  it('works', async function () {
    let t = new TestCase([
      {
        text: 'top row', children: [
          {
            text: 'middle row', children: [
              'bottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('Gx');
    t.expect([
      {
        text: 'top row', children: [
          {
            text: 'middle row', children: [
              'ottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('gpx');
    t.expect([
      {
        text: 'top row', children: [
          {
            text: 'iddle row', children: [
              'ottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('gpx');
    t.expect([
      {
        text: 'op row', children: [
          {
            text: 'iddle row', children: [
              'ottom row',
            ]
          },
        ]
      },
    ]);
    // can't go past the root
    t.sendKeys('gpx');
    t.expect([
      {
        text: 'p row', children: [
          {
            text: 'iddle row', children: [
              'ottom row',
            ]
          },
        ]
      },
    ]);
    await t.done();
  });

  it('causes a zoom out', async function () {
    let t = new TestCase([
      {
        text: 'top row', children: [
          {
            text: 'middle row', children: [
              'bottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('jj]]]x');
    t.expectViewRoot(3);
    t.expect([
      {
        text: 'top row', children: [
          {
            text: 'middle row', children: [
              'ottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('gpx');
    t.expectViewRoot(2);
    t.expect([
      {
        text: 'top row', children: [
          {
            text: 'iddle row', children: [
              'ottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('gpx');
    t.expectViewRoot(1);
    t.expect([
      {
        text: 'op row', children: [
          {
            text: 'iddle row', children: [
              'ottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('Gx');
    t.expect([
      {
        text: 'op row', children: [
          {
            text: 'iddle row', children: [
              'ttom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('ggx'); // verify viewroot is now top row
    t.expect([
      {
        text: 'p row', children: [
          {
            text: 'iddle row', children: [
              'ttom row',
            ]
          },
        ]
      },
    ]);
    await t.done();
  });

  it('does nothing at view root', async function () {
    let t = new TestCase([
      {
        text: 'top row', children: [
          {
            text: 'middle row', children: [
              'bottom row',
            ]
          },
        ]
      },
    ]);
    t.expectViewRoot(0);
    t.sendKeys('x');
    t.expect([
      {
        text: 'op row', children: [
          {
            text: 'middle row', children: [
              'bottom row',
            ]
          },
        ]
      },
    ]);
    t.sendKeys('gpx');
    t.expectViewRoot(0);
    t.expect([
      {
        text: 'p row', children: [
          {
            text: 'middle row', children: [
              'bottom row',
            ]
          },
        ]
      },
    ]);
    await t.done();
  });
});

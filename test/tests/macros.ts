/* globals describe, it */
import TestCase from '../testcase';

describe('macros', function () {
  it('basically work', async function () {
    let t = new TestCase(['banananana']);
    // does nothing since nothing has been recorded
    t.sendKeys('@q');
    t.expect(['banananana']);
    t.sendKeys('qqxlq');
    t.expect(['anananana']);
    t.sendKeys('4@q');
    t.expect(['aaaaa']);
    t.sendKeys('u');
    t.expect(['anananana']);
    t.sendKey('ctrl+r');
    t.expect(['aaaaa']);
    t.sendKeys('u');
    t.expect(['anananana']);
    t.sendKeys('l@q');
    t.expect(['annanana']);
    t.sendKeys('3.');
    t.expect(['annnn']);
    await t.done();

    t = new TestCase([
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
    ]);
    // does nothing since nothing has been recorded
    t.sendKeys('qmr1lr2jq');
    t.sendKeys('7@m');
    t.expect([
      '12000000',
      '01200000',
      '00120000',
      '00012000',
      '00001200',
      '00000120',
      '00000012',
      '00000002',
    ]);
    t.sendKeys('qmxxq');
    t.expect([
      '12000000',
      '01200000',
      '00120000',
      '00012000',
      '00001200',
      '00000120',
      '00000012',
      '000000',
    ]);
    // overrides old macro
    t.sendKeys('@m');
    t.expect([
      '12000000',
      '01200000',
      '00120000',
      '00012000',
      '00001200',
      '00000120',
      '00000012',
      '0000',
    ]);
    // can repeat
    // should it only do one delete?  (just need to enable save on recorded keystream)
    t.sendKeys('.');
    t.expect([
      '12000000',
      '01200000',
      '00120000',
      '00012000',
      '00001200',
      '00000120',
      '00000012',
      '00',
    ]);
    t.sendKeys('x');
    t.expect([
      '12000000',
      '01200000',
      '00120000',
      '00012000',
      '00001200',
      '00000120',
      '00000012',
      '0',
    ]);
    t.sendKeys('u');
    t.expect([
      '12000000',
      '01200000',
      '00120000',
      '00012000',
      '00001200',
      '00000120',
      '00000012',
      '00',
    ]);
    t.sendKeys('u');
    t.expect([
      '12000000',
      '01200000',
      '00120000',
      '00012000',
      '00001200',
      '00000120',
      '00000012',
      '0000',
    ]);
    await t.done();
  });

  it('work nested', async function () {
    // create a checkerboard!
    let t = new TestCase([
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
    ]);
    // does nothing since nothing has been recorded
    t.sendKeys('qqr1llq');
    t.expect([
      '10000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
    ]);
    t.sendKeys('0');
    t.sendKeys('qo4@qj0l4@qj0q');
    t.expect([
      '10101010',
      '01010101',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
      '00000000',
    ]);
    t.sendKeys('3@o');
    t.expect([
      '10101010',
      '01010101',
      '10101010',
      '01010101',
      '10101010',
      '01010101',
      '10101010',
      '01010101',
    ]);
    await t.done();
  });

  it('works even if sequence contains q', async function () {
    let t = new TestCase([
      'a q b q c q d q',
    ]);
    t.sendKeys('qxfqxq');
    t.expect([
      'a  b q c q d q',
    ]);
    t.sendKeys('@x');
    t.expect([
      'a  b  c q d q',
    ]);
    t.sendKeys('2@x');
    t.expect([
      'a  b  c  d ',
    ]);
    await t.done();
  });
});

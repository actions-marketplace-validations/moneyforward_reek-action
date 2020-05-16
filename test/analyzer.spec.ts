import { expect } from 'chai';
import stream from 'stream';
import util from 'util'
import Analyzer, { Result } from '../src/analyzer'
import { AssertionError } from 'assert';

describe('Transform', () => {
  it('should return the problem object', async () => {
    const expected = {
      file: 'foo/bar.rb',
      line: 1,
      column: undefined,
      severity: 'warning',
      message: `doesn't depend on instance state (maybe move it to another class?)`,
      code: 'UtilityFunction'
    };
    const result: Result = [
      {
        "context": "Bar#baz",
        "lines": [
          1
        ],
        "message": "doesn't depend on instance state (maybe move it to another class?)",
        "smell_type": "UtilityFunction",
        "source": "foo/bar.rb",
        "documentation_link": "https://github.com/troessner/reek/blob/v5.6.0/docs/Utility-Function.md"
      }
    ];
    const text = JSON.stringify(result);
    const analyzer = new (class extends Analyzer {
      public constructor() {
        super();
      }
      public createTransformStreams(): stream.Transform[] {
        return super.createTransformStreams();
      }
    })();
    const streams = [stream.Readable.from(text), ...analyzer.createTransformStreams()];
    await util.promisify(stream.pipeline)(streams);
    for await (const problem of streams[streams.length - 1]) {
      expect(problem).to.deep.equal(expected);
      return;
    }
    throw new AssertionError({ message: 'There was no problem to expect.', expected });
  });
});

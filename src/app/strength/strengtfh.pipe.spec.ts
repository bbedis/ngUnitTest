import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;
  beforeEach(() => {
    pipe = new StrengthPipe();
  })

  it('should display weak if strength is 5', () => {
    expect(pipe.transform(5)).toBe('5 (weak)');
  })

  it('should display strong if strength is 10', () => {
    expect(pipe.transform(10)).toBe('10 (strong)');
  })
})

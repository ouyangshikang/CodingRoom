import { add } from './math.js';

describe('测试', () => {
    it('add', () => {
        expect(add(1, 2)).toBe(3);
    });

    it('toBeGreaterThan', () => {
        const count = 10;
        expect(count).toBeGreaterThan(9);
    });

    it('toBeCloseTo', () => {
        expect(0.1 + 0.2).toBeCloseTo(0.3);
    })
});

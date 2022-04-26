import { describe, expect, it } from 'vitest';

import { listToDirection, splitWhitespace } from '~/utils/direction.js';
import { generateId } from '~/utils/id.js';

describe('util functions', () => {
	describe('Id', () => {
		it('sequentially generates id starting with 0', () => {
			const results = [...Array.from({ length: 5 })].map(() => generateId());

			expect(results).toStrictEqual([0, 1, 2, 3, 4]);
		});
	});

	describe('split', () => {
		it('splits space-separated string into array', () => {
			const value = 'taco pizza sushi';
			const result = splitWhitespace(value);

			expect(result).toStrictEqual(['taco', 'pizza', 'sushi']);
		});

		it('splits tab-separated string into array', () => {
			const value = 'taco\tpizza\tsushi';
			const result = splitWhitespace(value);

			expect(result).toStrictEqual(['taco', 'pizza', 'sushi']);
		});

		it('removes empty string items', () => {
			const value = 'taco \n \n \n';
			const result = splitWhitespace(value);

			expect(result).toStrictEqual(['taco']);
		});

		it('returns empty array when not a string value', () => {
			const values = [123, undefined, null, {}, []];

			for (const value of values) {
				const result = splitWhitespace(value);

				expect(result).toStrictEqual([]);
			}
		});
	});

	describe('listToDirection', () => {
		describe('when value is array', () => {
			it('returns object with x and y keys representing position', () => {
				const scenarios = [
					{ value: ['top', 'left'], result: { x: 'left', y: 'top' } },
					{ value: ['top', 'center'], result: { x: 'center', y: 'top' } },
					{ value: ['top', 'right'], result: { x: 'right', y: 'top' } },
					{ value: ['bottom', 'left'], result: { x: 'left', y: 'bottom' } },
					{ value: ['bottom', 'center'], result: { x: 'center', y: 'bottom' } },
					{ value: ['bottom', 'right'], result: { x: 'right', y: 'bottom' } },
				];

				for (const scenario of scenarios) {
					const result = listToDirection(scenario.value);

					expect(result).toStrictEqual(scenario.result);
				}
			});
		});

		describe('when value is string', () => {
			it('returns object with x and y keys representing position', () => {
				const scenarios = [
					{ value: 'top left', result: { x: 'left', y: 'top' } },
					{ value: 'top center', result: { x: 'center', y: 'top' } },
					{ value: 'top right', result: { x: 'right', y: 'top' } },
					{ value: 'bottom left', result: { x: 'left', y: 'bottom' } },
					{ value: 'bottom center', result: { x: 'center', y: 'bottom' } },
					{ value: 'bottom right', result: { x: 'right', y: 'bottom' } },
				];

				for (const scenario of scenarios) {
					const result = listToDirection(scenario.value);

					expect(result).toStrictEqual(scenario.result);
				}
			});
		});

		describe('when position is invalid', () => {
			// TODO: may need to handle invalid cases better
			it('returns null for the respective x or y key', () => {
				const scenarios = [
					{ value: 'top pizza', result: { x: null, y: 'top' } },
					{ value: 'pizza right', result: { x: 'right', y: null } },
					{ value: 'taco pizza', result: { x: null, y: null } },
				];

				for (const scenario of scenarios) {
					const result = listToDirection(scenario.value);

					expect(result).toStrictEqual(scenario.result);
				}
			});
		});
	});
});

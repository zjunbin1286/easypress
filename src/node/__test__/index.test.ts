import { expect, test } from 'vitest';

// 测试一些测试用例
test('add', () => {
  expect(1 + 1).toBe(2);
  expect('map'.slice(1)).toMatchSnapshot();
  expect('map'.slice(1)).toMatchInlineSnapshot('"ap"');
});

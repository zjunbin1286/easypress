import { test, expect } from '@playwright/test';

const siteUrl = 'http://localhost:5173';

test('Verify that the page renders properly', async ({ page }) => {
  await page.goto(siteUrl); // 进入页面

  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText;
    return pageContent.includes('CoderBin');
  });

  expect(res).toBe(true);
});

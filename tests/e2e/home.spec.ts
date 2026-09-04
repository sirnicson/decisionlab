import { test, expect } from '@playwright/test';

test('home presents the Fairhaven engagement and requires both workstreams for simulation',async({page})=>{
  await page.goto('/');
  await expect(page.getByRole('heading',{name:'Your engagement'})).toBeVisible();
  await expect(page.getByText('Fairhaven Environmental Trust',{exact:false}).first()).toBeVisible();
  await page.getByRole('button',{name:'Simulation Mode'}).click();
  const begin=page.getByRole('button',{name:'Begin engagement'});
  await expect(begin).toBeDisabled();
  await page.locator('#red-select').selectOption('caldera');
  await expect(begin).toBeDisabled();
  await page.locator('#sea-select').selectOption('tidal');
  await expect(begin).toBeEnabled();
});

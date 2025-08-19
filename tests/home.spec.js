import { test, expect } from '@playwright/test';

test('home', async({page})=>{
    await page.goto('https://demoblaze.com/');
    // await page.locator('id=login2').click();
    await page.click('id=login2')
    await page.fill('#loginusername', 'pavanol')
    await page.fill('input#loginpassword', 'test@123')
    await page.click("button[onclick='logIn()']")
    const logoutlink = await page.locator('#logout2')
    await expect(logoutlink).toBeVisible()
    await page.close


})
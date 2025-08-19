import {test, expect} from '@playwright/test'

test('multiplelocators', async({page})=>{
    await page.goto('https://demoblaze.com/')
    const links =  await page.$$('a')
    for(const link of links)
    {
        const text = await link.textContent();
        console.log(text)
    }

})
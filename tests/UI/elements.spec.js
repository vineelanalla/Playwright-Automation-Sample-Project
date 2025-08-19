import {test, expect} from '@playwright/test'
import path from 'path';


test('textbox', async({page})=>{
    await page.goto('https://demoqa.com/text-box')
    // const element = await page.locator('.card-body h5', {hasText : 'Elements'})
    // await expect(element).toBeVisible()
    // await element.click()
    // const elementsMenu = await page.locator('.header-text', {hasText : 'Elements'}) 
    // await expect(elementsMenu).toBeVisible()
    // await elementsMenu.click()
    // await expect(page.getByText('Elements')).toBeVisible()
    // await page.getByText('Elements').click();
    // await page.getByText('Text Box').click();
    await page.locator('#userName').fill('Vineela N')
    await page.getByPlaceholder('name@example.com').fill('vineelan09@gmail.com')
    await page.locator('#currentAddress').fill('123 street, Boston, MA')
    await page.locator('#permanentAddress').fill('345 street, Boston, MA')
    await page.getByRole('button', { name: 'submit' }).click();
    await expect(page.locator('#name')).toHaveText('Name:Vineela N');
    await expect(page.locator('#email')).toHaveText('Email:vineelan09@gmail.com');
    await expect(page.locator('#output #currentAddress')).toHaveText('Current Address :123 street, Boston, MA');
    await expect(page.locator('#output #permanentAddress')).toHaveText('Permananet Address :345 street, Boston, MA');
})

test('checkbox', async({page})=>{
    await page.goto('https://demoqa.com/checkbox/')
    // const element = await page.locator('.card-body h5', {hasText : 'Elements'})
    // await expect(element).toBeVisible()
    // await element.click()
    // await page.getByText('Check Box').click()
    const checkbox = page.locator('.rct-checkbox');
    if (await checkbox.locator('.rct-icon-uncheck').isVisible())
    {
        await checkbox.click()
    }
    await expect(checkbox.locator('.rct-icon-check')).toBeVisible()
})

test('radiobutton', async({page})=>{
    await page.goto('https://demoqa.com/radio-button')
    // const element = await page.locator('.card-body h5', {hasText : 'Elements'})
    // await expect(element).toBeVisible()
    // await element.click()
    // await page.getByText('Radio Button').click()
    await page.locator('label[for="impressiveRadio"]').click();
    await expect(page.locator('#impressiveRadio')).toBeChecked();
})

test('webtables', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  await page.getByRole('list').getByText('Web Tables').click();
  await page.getByRole('textbox', { name: 'Type to search' }).click();
  await page.getByRole('textbox', { name: 'Type to search' }).fill('Vega');
  await page.getByRole('gridcell', { name: 'Cierra', exact: true }).click();
  await expect(page.getByRole('grid')).toContainText('cierra@example.com');
  await page.locator('#edit-record-1').getByRole('img').click();
  await page.getByRole('textbox', { name: 'Age' }).click();
  await page.getByRole('textbox', { name: 'Age' }).fill('45');
  await page.getByRole('button', { name: 'Submit' }).click();
//   await page.locator('#delete-record-2').getByRole('img').click();
});

test('buttons', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');
  await page.dblclick('#doubleClickBtn')
  await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
  await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click')
  await page.locator('#rightClickBtn').click({ button: 'right' });
  await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click')
});

const statusLinks = [
  { name: 'Created', message: '201 Created' },
  { name: 'No Content', message: '204 No Content' },
  { name: 'Moved', message: '301 Moved Permanently' },
  { name: 'Bad Request', message: '400 Bad Request' },
  { name: 'Unauthorized', message: '401 Unauthorized' },
];

test('Home link opens in new tab', async ({ page, context }) => {
  await page.goto('https://demoqa.com/links');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Home', exact: true }).click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://demoqa.com/');
});

statusLinks.forEach(({ name, message }) => {
  test(`Link "${name}" shows correct status`, async ({ page }) => {
    await page.goto('https://demoqa.com/links');
    await page.getByRole('link', { name, exact: true }).click();
    const result = page.locator('#linkResponse');
    await expect(result).toBeVisible();
    await expect(result).toHaveText(message);
  });
});

// test('uploaddownload', async({page})=>{
//     await page.goto('https://demoqa.com/upload-download')
//     const uploadFilePath = path.join(__dirname, '1755164421177.JPG');
//     const uploadInput = page.locator('#uploadFile');
//     await uploadInput.setInputFiles(uploadFilePath)
//     await expect(uploadInput).toHaveValue(uploadFilePath);

//     const [download] = await Promise.all([
//       page.waitForEvent('download'),
//       page.locator('#downloadButton').click(),
//     ]);
//     const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
//     await download.saveAs(downloadPath);
//     expect(await fs.promises.stat(downloadPath)).toBeTruthy()
// })


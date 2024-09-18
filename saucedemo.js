const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new page
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();

    // Open the Sauce Demo website with increased timeout
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle2', timeout: 60000 });

    // Login
    await page.type('#user-name', 'standard_user'); // Replace with actual username
    await page.type('#password', 'secret_sauce'); // Replace with actual password
    await page.click('#login-button');
    await page.waitForSelector('.inventory_list'); // Wait for the inventory page to load

       // Click on the product link using the product name
       await page.waitForSelector('.inventory_item_name');
       await page.evaluate(() => {
           const productLink = Array.from(document.querySelectorAll('.inventory_item_name'))
               .find(element => element.textContent.includes('Sauce Labs Fleece Jacket'));
           if (productLink) {
               productLink.click();
           }
       });
   
       // Wait for the product detail page to be visible
       await page.waitForSelector('#inventory_item_container');
        // Add to cart
    await page.click('[data-test="add-to-cart"]'); // Add to cart button

    // Go to cart
    await page.click('.shopping_cart_link');
    //await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
 
 
  
    await page.goto('https://www.saucedemo.com/checkout-step-one.html', { waitUntil: 'networkidle2' });
 



         // Fill out the checkout form
         console.log('Filling out the checkout form...');
         await page.waitForSelector('#first-name');
         await page.type('#first-name', 'Nikhil');
         await page.type('#last-name', 'Singh');
         await page.type('#postal-code', '123456789');
 
         // Click Continue button
         await page.waitForSelector('[data-test="continue"]');
         await page.click('[data-test="continue"]');
         //await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });
   

 

  // Click the "Finish" button
  await page.click('[data-test="finish"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  //console.log('Checkout process completed.');


 await browser.close();
})();

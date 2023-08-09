const puppeteer = require("puppeteer");
const fs = require("fs").promises;

async function doThings2() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const cookiesString = await fs.readFile("./www.trademe.co.nz.cookies.json");
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);

  await page.goto(
    "https://www.trademe.co.nz/a/motors/cars/nissan/juke/listing/4162501060",
    {
      waitUntil: "networkidle0",
    }
  );

  const viewsElement = await page.waitForSelector(
    "body > tm-root > div:nth-child(1) > main > div > tm-new-listing > tm-private-listing > div.l-container.tm-motors-listing__content > div.tm-motors-listing__content--left > tm-listing-date-city > div > span.tm-motors-date-city-watchlist__views-container > strong"
  );
  const viewsValue = await viewsElement.evaluate((el) => el.textContent);

  console.log(viewsValue);

  await page.evaluate(() => {
    document
      .querySelector(
        "body > tm-root > div:nth-child(1) > main > div > tm-new-listing > tm-private-listing > div.l-container.tm-motors-listing__content > div.tm-motors-listing__content--left > div > tm-listing-q-and-a > div > tm-listing-ask-question > div > button"
      )
      .click();
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.type(
    "body > tm-root > div:nth-child(1) > main > div > tm-new-listing > tm-private-listing > div.l-container.tm-motors-listing__content > div.tm-motors-listing__content--left > div > tm-listing-q-and-a > div:nth-child(3) > tm-listing-ask-question > div > div > form > tg-comment > tg-media-block > tg-media-block-content > tg-comment-text > tg-input-container > label.o-input__body > span.o-input__body-primary.o-input__body-primary--is-blurred > textarea",
    `Congratulations, your listing has ${viewsValue} views! If you want even more views on your listing, consider upgrading your listing exposure tier in the 'edit listing' settings.`
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.evaluate(() => {
    document
      .querySelector(
        "body > tm-root > div:nth-child(1) > main > div > tm-new-listing > tm-private-listing > div.l-container.tm-motors-listing__content > div.tm-motors-listing__content--left > div > tm-listing-q-and-a > div > tm-listing-ask-question > div > div > form > button"
      )
      .click();
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await browser.close();
}

module.exports = doThings2;

doThings2();
//comment

const puppeteer = require("puppeteer");
const fs = require("fs").promises;

function doThings2() {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    const cookiesString = await fs.readFile("./www.trademe.co.nz.cookies.json");
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    // https://www.trademe.co.nz/a/motors/cars/nissan/juke/search?auto_category_jump=false&sort_order=motorslatestlistings

    await page.goto(
      "https://www.trademe.co.nz/a/motors/cars/nissan/juke/listing/4246063550",
      {
        waitUntil: "networkidle0",
      }
    );

    await page.evaluate(() => {
      document
        .querySelector(
          "body > tm-root > div:nth-child(1) > main > div > tm-new-listing > tm-private-listing > div.l-container.tm-motors-listing__content > div.tm-motors-listing__content--left > div > tm-listing-q-and-a > div > tm-listing-ask-question > div > button"
        )
        .click();
    });

    await page.type(
      "body > tm-root > div:nth-child(1) > main > div > tm-new-listing > tm-private-listing > div.l-container.tm-motors-listing__content > div.tm-motors-listing__content--left > div > tm-listing-q-and-a > div > tm-listing-ask-question > div > div > form > tg-comment > tg-media-block > tg-media-block-content > tg-comment-text > tg-input-container > label.o-input__body > span.o-input__body-primary.o-input__body-primary--is-blurred",
      "What a beautiful Juke!"
    );

    await page.evaluate(() => {
      document
        .querySelector(
          "body > tm-root > div:nth-child(1) > main > div > tm-new-listing > tm-private-listing > div.l-container.tm-motors-listing__content > div.tm-motors-listing__content--left > div > tm-listing-q-and-a > div > tm-listing-ask-question > div > div > form > button"
        )
        .click();
    });

    await browser.close();
  })();
}

module.exports = doThings2;

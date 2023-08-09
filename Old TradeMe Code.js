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

    const cookiesString = await fs.readFile("./www.youtube.com.cookies.json");
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    // https://www.trademe.co.nz/a/motors/cars/nissan/juke/search?auto_category_jump=false&sort_order=motorslatestlistings

    await page.goto("https://www.youtube.com/watch?v=fkmYQ1dZsVU", {
      waitUntil: "networkidle0",
    });

    await page.evaluate(() => {
      document
        .querySelector(
          "#subscribe-button > ytd-subscribe-button-renderer > yt-smartimation > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
        )
        .click();
    });

    await page.evaluate(() => {
      document
        .querySelector(
          "#segmented-like-button > ytd-toggle-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
        )
        .click();
    });

    await page.screenshot({ path: "question3.1.png" });

    await page.waitForTimeout(5000);

    await page.screenshot({ path: "question3.2.png" });

    await browser.close();
  })();
}

module.exports = doThings2;

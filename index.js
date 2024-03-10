const {By, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("node:assert");
const { until } = require('selenium-webdriver');

suite(function (env) {
  describe('Kullanıcı akakce.com sitesine giriş yapar.', function () {
    let driver;

    before(async function () {
      driver = await env.builder().build();
    });

    after(async () => {
      setTimeout(() => {
        driver.quit();
    }, 10000)
    });

    it('Web sitesine giris yapıldıgı görülür', async function () {

      try {
        await driver.get('https://akakce.com'); // Sayfanın adresini içeren kısım
        const title = await driver.getTitle()
        assert.equal("Ne Nerede En Ucuz Akakçe'de", title);  // Sayfanın kontrolü sayfada yer alan title ile yaptım.
      } catch (e) {
        console.log("## Title Hata oluştu ##",e)
      }
    });

    it('Kullanıcı arama çubuğuna iphone yazar', async function () {

      try {
        let inputField = await driver.findElement(By.id('q'));    // id değeri q olan olan elemente sendkey methodu ile iphone yazdırdım.
        await inputField.clear();
        await inputField.sendKeys('iphone');
        assert.equal(await inputField.getAttribute('value'), "iphone");
      } catch (e) {
        console.log("## Arama çubuğu hata ## ", e)
      }
    });

    it('Kullanıcı ürüne git butonuna tıklar', async function () {

      try {
        const searchButton = await driver.findElement(By.xpath('//*[@id="H_s_v8"]/button'))
        await driver.wait(until.elementIsVisible(searchButton), 3000);
        searchButton.click();
        console.log("Arama butonuna tıklar")
      }
      catch (e) {
        console.log("Arama butonunda hata oluştu ", e)
      }
    });

    it('Kullanıcı ilk ürünün "ürüne git" butonuna tıklar', async function () {
       try {
        const actionButton = By.xpath('//*[@id="CPL"]/li[1]/a/span/span[5]/b');
        await driver.wait(until.elementLocated(actionButton, 3000)).click();
        console.log("Listenin ilk elemanının ürüne git butonuna tıklar")
       } catch (e) {
          console.log("Listenin ilk elemanının ürüne git butonuna tıklamada hata oluştu ", e)
       }
    });

    it('Kullanıcı "ürünü takip et" butonuna tıklar', async function () {
      try {
         const followProduct = By.xpath('//*[@id="pf_w_v8"]/span')
         driver.executeScript("window.scrollBy(0,500)",followProduct)
         await driver.wait(until.elementLocated(followProduct, 3000)).click();
         console.log("Takip et butonuna tıklandı.")
      } catch (e) {
        console.log("Takip et butonuna tıklamada hata oluştu",e)
      }
    })
  
  });
}, 
// { browsers: [Browser.CHROME, Browser.FIREFOX, Browser.EDGE]}
{ browsers: [Browser.CHROME]}
);
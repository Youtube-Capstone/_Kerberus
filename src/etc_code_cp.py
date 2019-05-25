
from DBcontroller import DBcontroller
from analysis import analysis

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time

dbc = DBcontroller()

class demo:
    def __init__(self, url):
        self.url = url
        self.options = webdriver.ChromeOptions()
        self.options.add_argument('--headless')
        self.options.add_argument('lang=ko_KR')
        self.options.add_argument('--window-size=1920,1080')

    def test(self):
        driver = webdriver.Chrome('./chromedriver', chrome_options=self.options)
        driver.get(self.url)
        time.sleep(2)
        driver.find_element_by_tag_name('body').send_keys(Keys.PAGE_DOWN)
        time.sleep(2)

        self.__button(driver, "//*[@id='more']/yt-formatted-string")

        self.video_html = BeautifulSoup(driver.page_source, 'html.parser')
        video_category = self.__immutabilityvideoinformation()
        driver.quit()
        return video_category

    def __button(self, driver, xpath):
        driver.find_element_by_xpath(xpath).click()
        time.sleep(2)

    def __immutabilityvideoinformation(self):

        find_category = self.video_html.find('div', {'id': 'collapsible'})
        category = find_category.find_all('yt-formatted-string', {
            'class': 'style-scope ytd-metadata-row-renderer'})

        for idx in range(len(category)):
            if category[idx].text == "카테고리":
                video_category = find_category.find_all('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'})[idx].text
                return video_category

if __name__ == '__main__':
        URLs = dbc.execQuery("select VIDEO_URL from MEDIA_INFO")
        URL_list = []
        for tmp in URLs:
            URL_list.append(tmp[0])
        idx = 0
        for URL in URL_list:
            print(URL)
            test = demo(url=URL)
            CATEGORY = test.test()
            print(idx, CATEGORY)
            dbc.execQuery("update MEDIA_INFO set CATEGORY='{}' where VIDEO_URL='{}'".format(CATEGORY, URL))
            idx = idx + 1

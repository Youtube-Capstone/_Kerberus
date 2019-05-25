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

        video_html = BeautifulSoup(driver.page_source, 'html.parser')  # 스크롤로 인해서 업데이트된 웹을 html로 파싱
        
        self.secondary = video_html.find('ytd-video-secondary-info-renderer',
                                         {'class': 'style-scope ytd-watch-flexy'})

        video_category = self.__immutabilityvideoinformation()
        return video_category

    def __button(self, driver, xpath):
        driver.find_element_by_xpath(xpath).click()
        time.sleep(2)

    def __immutabilityvideoinformation(self):
        channel_name = self.secondary.find('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'}).text
        channel_url = 'https://www.youtube.com' + \
                      self.secondary.find('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'})['href']
        
        return channel_name, channel_url
        # find_category = self.secondary.find('div', {'id': 'collapsible'})
        # category = find_category.find_all('yt-formatted-string', {
        #     'class': 'style-scope ytd-metadata-row-renderer'})

        # for idx in range(len(category)):
        #     if category[idx].text == "카테고리":
        #         video_category = find_category.find_all('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'})[idx].text
        #         return video_category


if __name__ == '__main__':
        product_name = ["아이폰 XS","갤럭시 S9", "엘지 G7", "엘지 그램", "삼성 노트북 9 ALWAYS", "갤럭시탭 S4", "아이패드 6세대", "아이패드 프로 3세대"]

        for product in product_name:
            comment_file = open('./'+product+'.txt','w',encoding="utf8")
            COMMENT_TABLE = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME = '{}'".format(product))
            for TABLE in COMMENT_TABLE:
                COMMENT = dbc.execQuery("select CONTENT from {}".format(TABLE[0]))
                for TEXT in COMMENT:
                    comment_file.write(TEXT[0])
                    




            # test = demo(url=URL)
            # CATEGORY = test.test()
            # CHANNEL_NAME, CHANNEL_URL = test.test()

            # dbc.execQuery("update MEDIA_INFO set CATEGORY='{}' where VIDEO_URL='{}'".format(CATEGORY, URL))
            # dbc.execQuery("update MEDIA_INFO set CHANNEL_NAME=\"{}\", CHANNEL_URL=\"{}\" where VIDEO_URL='{}'".format(CHANNEL_NAME, CHANNEL_URL, URL))


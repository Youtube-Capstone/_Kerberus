from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import random
import re
import datetime


class crawling:
    def __init__(self, word, filt):
        self.word = word  # 호출 시 입력 받은 검색어 변수저장
        self.filt = filt
        self.options = webdriver.ChromeOptions()
        self.options.add_argument('--headless')
        self.options.add_argument('lang=ko_KR')
        self.options.add_argument('--window-size=1920,1080')

    def __driverget(self, url):
        driver = webdriver.Chrome('./chromedriver', chrome_options=self.options)
        driver.get(url)
        time.sleep(2)

        return driver

    def __scroll(self, driver, count):  # 스크롤을 아래로 내리기 위한 메소드
        last_height = driver.execute_script("return document.documentElement.scrollHeight")  # 처음 웹의 높이
        while True:
            driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")  # 스크롤을 현재 웹의 맨 아래로 내
            print("scroll")
            time.sleep(random.randrange(2, 5))  # 입력한 시간 만큼 대기
            new_height = driver.execute_script("return document.documentElement.scrollHeight")  # 내린 후에 업데이트 된 웹의 높이
            count -= 1
            if count == 0:
                break
            elif new_height == last_height:
                break

            last_height = new_height  # 처음 높이 값을 새로운 값으로 업데이트

    def __pagedown(self, driver):
        driver.find_element_by_tag_name('body').send_keys(Keys.PAGE_DOWN)
        time.sleep(2)

    def __button(self, driver, xpath):
        driver.find_element_by_xpath(xpath).click()
        time.sleep(2)

    def __extraction(self, sentence):
        daycompile = re.compile("\d+")
        numbercompile = re.compile("[\d.]+")
        textcompile = re.compile("[ㄱ-ㅣ가-힣]+")

        units = [['천', 1000], ['만', 10000], ['억', 100000000]]

        try:
            number = float(''.join(numbercompile.findall(sentence)))

            try:
                text = textcompile.findall(sentence)[-1]

                for unitt, unitn in units:
                    if unitt in text:
                        number = number * unitn

                return number

            except:
                return number

        except:
            day = ''.join(daycompile.findall(sentence))
            if day:
                return day
            else:
                return 0

    def __findhangul(self, sentence):
        hangul = re.compile('[ㄱ-ㅣ가-힣]+')
        hangul_list = hangul.findall(sentence)
        return hangul_list

    def __findcharacter(self, sentence):
        character = re.compile('[ㄱ-ㅣ가-힣a-zA-Z0-9\s`~!@#$%^&*()-=_+{}\[\],./<>?;\'":|\\\]+')
        character_list = character.findall(sentence)
        return character_list

    def __replace(self, sentence):
        sentence_replace = sentence.replace('\\', '\\\\').replace('"', '\\"')
        content = ''.join(self.__findcharacter(sentence_replace))

        if len(content) > 2000:
            content = content[:2000]

        return content

    def geturl(self):
        video_url = []
        count = 0
        print("start geturl")
        url_driver = self.__driverget('https://www.youtube.com/results?search_query=' + self.word)  # 입력 받은 검색어로 유튜브 검색
        print("scroll progressing")
        while True:

            video_html = BeautifulSoup(url_driver.page_source, 'html.parser')  # 스크롤로 인해서 업데이트된 웹을 html로 파싱
            video_list = video_html.find_all('ytd-video-renderer', {
                'class': 'style-scope ytd-item-section-renderer'})  # 모든 동영상에 대한 정보 태그를 다 가져옴

            if count == len(video_list):
                url_driver.quit()
                print("더 이상의 동영상이 없어서 종료합니다")
                print("scroll complete")
                print("finish geturl")
                return video_url

            for idx in range(count, len(video_list)):
                video = video_list[idx].find('a', {'id': 'video-title'})
                video_view = video_list[idx].find('span', {'class': 'style-scope ytd-video-meta-block'}).text
                title = video['title'].strip()
                href = video['href']

                if not self.__findhangul(title):
                    print("========================================")
                    print("한글 없음: %s" % title)
                    continue

                elif self.__extraction(video_view) < 4500:
                    print("========================================")
                    print("제목 : %s" % title)
                    print("조회수 적음: %d" % self.__extraction(video_view))
                    continue

                else:
                    for check_word in self.filt:
                        if check_word in title.upper():
                            video_url.append('https://www.youtube.com' + href)  # 동영상 링크
                            print("========================================")
                            print(len(video_url))
                            print(title)
                            print(video_view)
                            break

                    if len(video_url) == 70:
                        url_driver.quit()
                        print("scroll complete")
                        print("finish geturl")
                        return video_url

            count = len(video_list)
            self.__scroll(url_driver, 1)

    def getvideo(self, video_url):
        checkcount = 2
        print("start getvideo")
        video_driver = self.__driverget(video_url)  # 동영상 링크 입력받아 동적으로 웹에 실행

        self.__pagedown(video_driver)

        while True:
            try:
                if checkcount > 9:
                    print("존재하지 않는 동영상")
                    return -1

                self.__button(video_driver, "//*[@id='more']/yt-formatted-string")
                self.__button(video_driver, "//*[@id='label']")
                self.__button(video_driver, "//*[@id='menu']/a[2]")  # 댓글 최근날짜순으로 정렬위한 클릭
                break
            except:

                print("웹 페이지 전체 로딩완료 까지 %d초 대기" % checkcount)
                time.sleep(checkcount)
                checkcount += 2
                continue

        print("scroll progressing")
        self.__scroll(video_driver, -1)  # 댓글 가져오기 위한 스크롤 작동
        print("scroll complete")

        video_html = BeautifulSoup(video_driver.page_source, 'html.parser')  # 스크롤로 인해서 업데이트된 웹을 html로 파싱
        self.primary = video_html.find('ytd-video-primary-info-renderer',
                                       {'class': 'style-scope ytd-watch-flexy'})
        self.secondary = video_html.find('ytd-video-secondary-info-renderer',
                                         {'class': 'style-scope ytd-watch-flexy'})

        video_driver.quit()
        print("finish getvideo")

        return 1

    def immutabilityvideoinformation(self):
        print("start immutabilityvideoinformation")

        upload_date_text = self.secondary.find('span',
                                           {'class': 'date style-scope ytd-video-secondary-info-renderer'}).text
        print(upload_date_text)
        upload_date = str(self.__extraction(upload_date_text))
        print(upload_date)
        upload_date_format = datetime.datetime.strptime(upload_date, "%Y%m%d").date()

        channel_name = self.secondary.find('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'}).text
        channel_url = 'https://www.youtube.com' + \
                      self.secondary.find('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'})['href']

        video_content_text = self.secondary.find('yt-formatted-string', {
            'class': 'content style-scope ytd-video-secondary-info-renderer'}).text

        video_content = self.__replace(video_content_text)

        find_category = self.secondary.find('div', {'id': 'collapsible'})
        category = find_category.find_all('yt-formatted-string', {
            'class': 'style-scope ytd-metadata-row-renderer'})

        for idx in range(len(category)):
            if category[idx].text == "카테고리":
                video_category = find_category.find_all('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'})[idx].text
                break

        print("finish immutabilityvideoinformation")
        return upload_date_format, channel_name, channel_url, video_content, video_category

    def variabilityvideoinformation(self):
        print("start variabilityvideoinformation")
        view_text = self.primary.find('span', {'class': 'view-count style-scope yt-view-count-renderer'}).text
        view = self.__extraction(view_text)
        like_or_dislike = self.primary.find_all('yt-formatted-string',
                                                   {'class': 'style-scope ytd-toggle-button-renderer style-text'})
        like = self.__extraction(like_or_dislike[0].text)
        dislike = self.__extraction(like_or_dislike[1].text)

        channel_subscribe_count_text = self.secondary.find('div', {'id': 'subscribe-button'})
        channel_subscribe_count = self.__extraction(
            channel_subscribe_count_text.find('yt-formatted-string', {'id': 'text'}).text)

        video_title_text = self.primary.find('yt-formatted-string',
                                                {'class': 'style-scope ytd-video-primary-info-renderer'}).text

        video_title = self.__replace(video_title_text)
        print("finish variabilityvideoinformation")
        return view, like, dislike, channel_subscribe_count, video_title

    def getcomment(self):
        comment = []
        comment_count = 0
        print("start getcomment")
        comment_count_check = self.video_html.find('yt-formatted-string',
                                                   {
                                                       'class': 'count-text style-scope ytd-comments-header-renderer'}).text
        if self.__extraction(comment_count_check) == 0:
            print("해당 동영상은 댓글이 존재하지 않습니다")
            print("finish getcomment")
            return comment_count, comment

        video_comment_text = self.video_html.find_all('yt-formatted-string',
                                                      {'id': 'content-text'})  # 한 동영상에 대한 모든 댓글 태그 가져옴
        video_comment_writer = self.video_html.find_all('a',
                                                        {'id': 'author-text'})
        for i in range(len(video_comment_text)):
            if not self.__findhangul(video_comment_text[i].text.strip()):
                continue

            video_comment = self.__replace(video_comment_text[i].text.strip())

            video_comment_writer_encode = str((video_comment_writer[i].text.strip()).encode('unicode_escape'),
                                              'utf-8').replace("\\", "\\\\")

            comment.append([video_comment_writer_encode, video_comment])

        comment_count = len(comment)
        print("finish getcomment")
        return comment_count, comment
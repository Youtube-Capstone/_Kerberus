from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time

class crawling:
    def __init__(self,word):
        self.word = word # 호출 시 입력 받은 검색어 변수저장

    def __scroll__(self,count): # 스크롤을 아래로 내리기 위한 메소드
        SCROLL_PAUSE_TIME = count  # 몇 초 쉬고 내린것인지
        last_height = driver.execute_script("return document.documentElement.scrollHeight")  # 처음 웹의 높이
        while True:
            driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")  # 스크롤을 현재 웹의 맨 아래로 내림
            time.sleep(SCROLL_PAUSE_TIME)  # 입력한 시간 만큼 대기
            new_height = driver.execute_script("return document.documentElement.scrollHeight")  # 내린 후에 업데이트 된 웹의 높이
            if new_height == last_height or (
                    count == 1 and new_height >= 0):  # 처음과 내린 후 비교해서 같으면 종료 또는 동영상 제목을 가져올 때 무한히 가져오지 않고 제한을 두기 위해서 0을 적당한 높이 값으로 수정해서 얼만큼 내릴지 설정, 한 번 내릴때 3080차이 씩 벌어짐
                break
            last_height = new_height  # 처음 높이 값을 새로운 값으로 업데이트

    def __gettitle__(self):
        driver.get('https://www.youtube.com/results?search_query=' + self.word)  # 입력 받은 검색어로 유튜브 검색
        time.sleep(3)  # 로딩까지 3초 대기

        self.__scroll__(1)  # 동영상 제목 가져오기 위한 스크롤 작동

        video_html = BeautifulSoup(driver.page_source, 'html.parser')  # 스크롤로 인해서 업데이트된 웹을 html로 파싱
        video_list = video_html.find_all('a', {
            'class': 'yt-simple-endpoint style-scope ytd-video-renderer'})  # 모든 동영상에 대한 정보 태그를 다 가져옴

        video_tl = []

        for video in video_list:
            video_title = video['title']  # 동영상 제목
            video_link = 'https://www.youtube.com' + video['href']  # 동영상 링크
            video_tl.append([video_title, video_link])  # 배열에 추가

        return video_tl

    def __getvideo__(self,video_url):
        driver.get(video_url)  # 동영상 링크 입력받아 동적으로 웹에 실행
        time.sleep(3)
        body = driver.find_element_by_tag_name('body')
        body.send_keys(Keys.PAGE_DOWN)  # 스크롤 메소드 실행전 댓글을 웹페이지에 로딩하기 위해 스크롤을 한번만 내림
        time.sleep(2)
        driver.find_element_by_xpath('//*[@id="label"]').click()
        time.sleep(1)
        driver.find_element_by_xpath(
            '//*[@id="menu"]/a[2]/paper-item/paper-item-body/div[1]').click()  # 댓글 최근날짜순으로 정렬위한 클릭
        time.sleep(2)
        self.__scroll__(2)  # 댓글 가져오기 위한 스크롤 작동

        video_html = BeautifulSoup(driver.page_source, 'html.parser')  # 스크롤로 인해서 업데이트된 웹을 html로 파싱

        self.__getvideoinformation__(video_html) # 비디오 정보 가져오기
        self.__getcomment__(video_html) # 비디오의 댓글 가져오기

    def __getvideoinformation__(self,information_html):
        view = information_html.find('span', {'class': 'view-count style-scope yt-view-count-renderer'}).text
        view = int(''.join(list(filter(str.isdigit, view)))) # 숫자만 추출
        like_or_dislike = information_html.find_all('yt-formatted-string',
                                                    {'class': 'style-scope ytd-toggle-button-renderer style-text'})
        like = like_or_dislike[0].text
        dislike = like_or_dislike[1].text
        upload_date = information_html.find('span',
                                            {'class': 'date style-scope ytd-video-secondary-info-renderer'}).text
        channel = information_html.find('div', {'id': 'owner-container'})
        channel_name = channel.text.strip()
        channel_url = 'https://www.youtube.com' + channel.find('a', {'class': 'yt-simple-endpoint style-scope yt-formatted-string'})['href']
        # 구독자 수 정확한 수치로 할건지 반올림한 수치로 할건지 결정 후 추가
        video_content = information_html.find('yt-formatted-string',
                                              {'class': 'content style-scope ytd-video-secondary-info-renderer'}).text

        print(view,like,dislike,upload_date,channel_name,channel_url,video_content) # test용 프린트

    def __getcomment__(self,comment_html):
        video_comment = comment_html.find_all('yt-formatted-string',
                                              {'id': 'content-text'})  # 한 동영상에 대한 모든 댓글 태그 가져옴
        comment_count = len(video_comment) # 댓글의 답글 제외한 수
        for i in video_comment: # test용 프린트
            print(i.text)

    def comment(self):
        videos = self.__gettitle__() # 동영상들의 정보를 받아서
        for title, video_url in videos:
            self.__getvideo__(video_url)

if __name__ == '__main__':
    driver = webdriver.Chrome('chromedriver') # 동적 크롤링 위한 크롬드라이버 실행
    driver.implicitly_wait(3) # 로딩위한 3초 대기

    test = crawling(word="구글홈") # crawling 클래스 변수 word에 원하는 제품명 넣고 크롤링 시작
    a = test.comment()
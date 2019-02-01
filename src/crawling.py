from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
# import requests
import time

class crawling:
    def __init__(self,word):
        self.word = word
        self.dict = {}

    def __gettitle__(self):
        driver.get('https://www.youtube.com/results?search_query='+self.word) #해당 url 접속, 갤럭시 노트9부분이 유튜브 검색어 치는 부분
        body = driver.find_element_by_tag_name('body') #스크롤위한 전체 바디 설정
        scroll_num = 0
        while scroll_num < 1: #숫자 1을 늘리면 늘릴수록 스크롤다운하는 횟수 증가, 늘릴수록 많은 동영상 목록가져옴
            body.send_keys(Keys.PAGE_DOWN)
            time.sleep(0.3)
            scroll_num += 1

        video_html = BeautifulSoup(driver.page_source,'html.parser') #검색한 동영상이 페이지에 여러개가 로드가 끝나면 beautifulsoup로 해당 페이지 html로 파싱
        video_list = video_html.find_all('a', {'class': 'yt-simple-endpoint style-scope ytd-video-renderer'}) #각 비디오 제목과 url를 가져옴

        video_tl = []

        for video in video_list: #제목과 링크로 배열에 추가
            video_title = video['title']
            video_link = 'https://www.youtube.com' + video['href']
            video_tl.append([video_title,video_link])

        return video_tl #제목과 링크가 추가된 배열 리턴

    def __getcomment__(self,title,video_url):
        comment_list = [] #한 동영상의 댓글 넣기 위한 배열
        driver.get(video_url) #동영상 링크넣어서 호출
        time.sleep(3) #로딩까지 대기
        body = driver.find_element_by_tag_name('body') #위에 부분과 동일한 역활
        scroll_num = 0
        while scroll_num < 1:
            body.send_keys(Keys.PAGE_DOWN)
            time.sleep(3) #댓글 로드가 시간이 걸리므로 3초 대기
            scroll_num += 1

        comment_html = BeautifulSoup(driver.page_source, 'html.parser') #위와 동일
        video_comment = comment_html.find_all('yt-formatted-string', {'class': 'style-scope ytd-comment-renderer'}) #댓글 부분 가져옴

        for comment in video_comment:
            if comment.text != '\n': #댓글 가져올 때 쓸모없는 부분 제거하기 위하 조건문, 일단 엔터만 처리
                comment_list.append(comment.text) #배열에 추가

        self.dict[title] = comment_list #딕션에 추가

    def comment(self):
        videos = self.__gettitle__()
        for i in range(len(videos)):
            self.__getcomment__(videos[i][0], videos[i][1])
        return self.dict

if __name__ == '__main__':
    driver = webdriver.Chrome('chromedriver') #구글 웹드라이버 실행해서 동적으로 크롤링 준비
    driver.implicitly_wait(3) # 로딩위해 3초 대기

    test = crawling(word="아이폰9")
    dc = test.comment()

    for key, value in dc.items(): #딕션출력
        print(key, ":", value)

    driver.close()

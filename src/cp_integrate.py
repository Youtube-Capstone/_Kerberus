from crawling import crawling
from DBcontroller import DBcontroller
import datetime

if __name__ == '__main__':
    CRAWLED_DATE = datetime.datetime.today().strftime("%Y-%m-%d")

    dbc = DBcontroller()

    product_name = ["구글홈", "갤럭시 9", "엘지 G7", "엘지 그램 15 2018", "삼성 노트북 9 always", "갤럭시탭 S4", "아이패드 6세대", "아이패드 프로 3세대"]
    
    for MODEL_NAME in product_name:
        cl = crawling(word=MODEL_NAME) # crawling 클래스 변수 word에 원하는 제품명 넣고 크롤링 시작
        url = cl.geturl(1)
        for VIDEO_URL in url:
            cl.getvideo(VIDEO_URL)
            check = dbc.check_video_in_table(VIDEO_URL)
            if check == False:
               VIDEO_POSTED_DATE, CHANNEL_NAME, CHANNEL_URL, VIDEO_DESCRIPTION, CATEGORY = cl.immutabilityvideoinformation()
               VIEWS, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_TITLE = cl.variabilityvideoinformation()
               NUM_OF_REPLY, COMMENT = cl.getcomment()
               return_reply_table_name = dbc.Insert_video_in_MEDIA_INFO_return_Reply_table_name(MODEL_NAME, CHANNEL_URL, CHANNEL_NAME, VIDEO_TITLE, VIDEO_URL, NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_DESCRIPTION, VIDEO_POSTED_DATE, CATEGORY)
               for content, author in reversed(COMMENT):
                   dbc.Insert_reply_info_by_table_name(return_reply_table_name, content, CRAWLED_DATE, author)
               print("complete:insert case")

            else:
               VIEWS, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_TITLE = cl.variabilityvideoinformation()
               NUM_OF_REPLY, COMMENT = cl.getcomment()
               before_comment_count = dbc.get_num_of_reply_by_url(VIDEO_URL)
               after_comment_count = NUM_OF_REPLY - before_comment_count
               Reply_ref_table_name = dbc.Update_video_in_MEDIA_INFO_return_reply_table(VIDEO_URL, VIDEO_TITLE, NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES, HATES, NUM_OF_SUBSCIBER)
               for content, author in reversed(COMMENT[:after_comment_count]):
                   dbc.Insert_reply_info_by_table_name(Reply_ref_table_name, content, CRAWLDE_DATE, author)
               print("complete2:update case")

               

from crawling import crawling
from DBcontroller import DBcontroller
import datetime

if __name__ == '__main__':
    CRAWLED_DATE = datetime.datetime.today().strftime("%Y-%m-%d")

    dbc = DBcontroller()
    model_name = dbc.execQuery("select MODEL_NAME from MODEL_INFO")
    filter_word = dbc.execQuery("select FILTER_WORD from MODEL_INFO")
    #filter_word = [["XS"],["S9"],["G7"],["그램"],["ALWAYS","올웨이즈"],["S4"],["6세대"],["프로","3세대"]]
    
    MODEL = zip(model_name,filter_word)

    for MODEL_NAME, FILT in MODEL:
        if ',' in FILT[0]:
           FILT = FILT[0].split(',')
        else:
           FILT = [FILT[0]]

        cl = crawling(word=MODEL_NAME[0],filt=FILT) # crawling 클래스 변수 word에 원하는 제품명 넣고 크롤링 시작
        url = cl.geturl()
        size = len(url)
        count_num = 1
        for VIDEO_URL in url:
            print(VIDEO_URL)
            print("%d/%d 번째 동영상 크롤링 중" % (count_num,size))
            count_num+=1
            confirm = cl.getvideo(VIDEO_URL)
            if confirm < 0:
               continue

            check = dbc.check_video_in_table(VIDEO_URL)
            if check == False:
               VIDEO_POSTED_DATE, CHANNEL_NAME, CHANNEL_URL, VIDEO_DESCRIPTION, CATEGORY = cl.immutabilityvideoinformation()
               VIEWS, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_TITLE = cl.variabilityvideoinformation()
               NUM_OF_REPLY, COMMENT = cl.getcomment()
               if NUM_OF_REPLY == 0:
                  print("댓글 수가 0개 이므로 테이블에 추가하지 않습니다")
                  continue

               else:
                    return_reply_table_name = dbc.Insert_video_in_MEDIA_INFO_return_Reply_table_name(MODEL_NAME[0], CHANNEL_URL, CHANNEL_NAME, VIDEO_TITLE, VIDEO_URL, NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_DESCRIPTION, VIDEO_POSTED_DATE, CATEGORY)
                    for author, content in reversed(COMMENT):
                        dbc.Insert_reply_info_by_table_name(return_reply_table_name, content, CRAWLED_DATE, author)
                    print("complete:insert case")

            else:
               VIEWS, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_TITLE = cl.variabilityvideoinformation()
               NUM_OF_REPLY, COMMENT = cl.getcomment()
               before_comment_count = dbc.get_num_of_reply_by_url(VIDEO_URL)
               after_comment_count = NUM_OF_REPLY - before_comment_count
               Reply_ref_table_name = dbc.Update_video_in_MEDIA_INFO_return_reply_table(VIDEO_URL, VIDEO_TITLE, NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES, HATES, NUM_OF_SUBSCIBER)
               for author, content in reversed(COMMENT[:after_comment_count]):
                   dbc.Insert_reply_info_by_table_name(Reply_ref_table_name, content, CRAWLED_DATE, author)
               print("complete2:update case")

               

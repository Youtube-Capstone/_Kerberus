from crawling_v2 import crawling
from DBcontroller import DBcontroller
import datetime

def ready_date():
    crawled_date = datetime.datetime.today().strftime("%Y-%m-%d")
    model_name = dbc.execQuery("select MODEL_NAME from MODEL_INFO")
    filter_word = dbc.execQuery("select FILTER_WORD from MODEL_INFO")

    model = zip(model_name, filter_word)

    return crawled_date, model

def start_crawling(NAME, FILT_WORD):
    cl = crawling(word=NAME,filt=FILT_WORD)
    url = cl.geturl()
    size = len(url)
    count_num = 1
    for VIDEO_URL in url:
        print(VIDEO_URL)
        print("%d/%d 번째 동영상 크롤링 중" % (count_num, size))
        count_num += 1
        check = dbc.check_video_in_table(VIDEO_URL)
        result_list = cl.get_youtube_information_comments(VIDEO_URL,check)

        try:
            if len(result_list) == 12:
                print("new table create")
                VIDEO_POSTED_DATE, CHANNEL_NAME, CHANNEL_URL, VIDEO_DESCRIPTION, CATEGORY, VIEWS, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_TITLE, NUM_OF_REPLY, COMMENT = result_list
                return_reply_table_name = dbc.Insert_video_in_MEDIA_INFO_return_Reply_table_name(MODEL_NAME[0],
                                                                                                 CHANNEL_URL,
                                                                                                 CHANNEL_NAME,
                                                                                                 VIDEO_TITLE,
                                                                                                 VIDEO_URL,
                                                                                                 NUM_OF_REPLY,
                                                                                                 VIEWS,
                                                                                                 CRAWLED_DATE,
                                                                                                 LIKES, HATES,
                                                                                                 NUM_OF_SUBSCIBER,
                                                                                                 VIDEO_DESCRIPTION,
                                                                                                 VIDEO_POSTED_DATE,
                                                                                                 CATEGORY)
                for author, content in reversed(COMMENT):
                    dbc.Insert_reply_info_by_table_name(return_reply_table_name, content, CRAWLED_DATE, author)
                print("complete:insert case")
            elif len(result_list) == 7:
                print("update table")
                VIEWS, LIKES, HATES, NUM_OF_SUBSCIBER, VIDEO_TITLE, NUM_OF_REPLY, COMMENT = result_list
                before_comment_count = dbc.get_num_of_reply_by_url(VIDEO_URL)
                after_comment_count = NUM_OF_REPLY - before_comment_count
                Reply_ref_table_name = dbc.Update_video_in_MEDIA_INFO_return_reply_table(VIDEO_URL, VIDEO_TITLE,
                                                                                         NUM_OF_REPLY, VIEWS,
                                                                                         CRAWLED_DATE, LIKES, HATES,
                                                                                         NUM_OF_SUBSCIBER)
                for author, content in reversed(COMMENT[:after_comment_count]):
                    dbc.Insert_reply_info_by_table_name(Reply_ref_table_name, content, CRAWLED_DATE, author)
                print("complete2:update case")
        except:
            print("동영상 또는 댓글이 없습니다.")
            continue

if __name__ == '__main__':
    dbc = DBcontroller()
    CRAWLED_DATE, MODEL = ready_date()

    for MODEL_NAME, FILT in MODEL:
        if ',' in FILT[0]:
           FILT = FILT[0].split(',')
        else:
           FILT = [FILT[0]]

        start_crawling(MODEL_NAME[0], FILT)


#  실행 전에 조건
#  1. pyenv 설정을 해줘야함. (pyenv activate capstone)
#  2. RDS가 정상 작동하는지 확인 (https://ap-northeast-1.console.aws.amazon.com/rds/home?region=ap-northeast-1#database:id=youtubedata;is-cluster=false)

import pymysql

class DBcontroller:
    def __init__(self):
        # connect
        self.__hostname = 'youtube-db-plz.chrss0yvchv7.ap-northeast-1.rds.amazonaws.com'
        self.__dbuser = 'kbrs'
        self.__dbport = 3306
        self.__dbname = 'kbrs_db'
        self.__charset = 'utf8'
        self.__password = 'tjdwns12!!'
        self.__conn = self.getConnection()

        self.video_table_name = "MEDIA_INFO"
        self.Reply_ref_table = "REPLY_REF_TABLE"

        self.product_name = ["아이폰 XS", "갤럭시 S9", "엘지 G7", "엘지 그램 15 2018", "엘지 그램", "삼성 노트북 9 always","삼성 노트북 9 ALWAYS", "갤럭시탭 S4", "아이패드 6세대", "아이패드 프로 3세대"]
        self.product_name_DB_version = ["ap_p_ipxs", "ss_p_s9", "lg_p_g7", "lg_n_gram15", "lg_n_gram15", "ss_n_alwy9", "ss_n_alwy9", "ss_t_galtap4", "ap_t_ipd6", "ap_t_pro3"]

    def getConnection(self):
        try:
            conn = pymysql.connect(
                host=self.__hostname,
                port=self.__dbport,
                user=self.__dbuser,
                password=self.__password,
                db=self.__dbname,
                charset=self.__charset)
        except Exception:
            print("genConnection : Error in Mysql or MariaDB connection")
            return (-1)

        print(
            'connection success : ' + self.__dbuser + ' in ' + self.__dbname + ' with charset = ' + self.__charset)
        return conn

    def closeConn(self):
        if self.__conn.open :
            self.__conn.close()
        else : print("already MariaDB conntion is closed")

    def DBcommit(self):
        self.__conn.commit()

    def execQuery(self, sqlQuery):
        self.check_connect_and_reconnect()

        try:
            with self.__conn.cursor() as cur:
                cur.execute(sqlQuery)
                result = cur.fetchall()
                self.DBcommit()
                return result
        except Exception:
            print(sqlQuery)
            print("execQuery : Error in calling conn.cursor")
            self.closeConn()
            return ""

    def __execQuery_and_printResult(self, sqlQuery):
        self.check_connect_and_reconnect()

        try:
            with self.__conn.cursor() as cur:
                cur.execute(sqlQuery)
                rows = cur.fetchall()
                self.DBcommit()
                print('exec result : ')
                print(rows)

        except Exception:
            print("execQuery_and_printResult : Error in calling conn.cursor")

    def __Name_generator_reply_ref_table(self, MODEL_NAME, VIDEO_URL):
        # VIDEO URL 정보는 쓰지않음
        VIDEO_INDEX = 0
        result = self.execQuery('select ID from MEDIA_INFO order by ID desc limit 1')
        if len(result) == 0:
            VIDEO_INDEX = 1
        else : VIDEO_INDEX = result[0][0] + 1


        MODEL_NAME_CODE = ""
        underbar = '_'

        for idx in range(len(self.product_name)):
            if (MODEL_NAME == self.product_name[idx]):
                MODEL_NAME_CODE = self.product_name_DB_version[idx]
                break

        reply_ref_table_name = MODEL_NAME_CODE + underbar + str(VIDEO_INDEX)
        return reply_ref_table_name

    def __Generator_Reply_ref_table_schema(self, reply_table_name):
        Reply_ref_schema = "CREATE TABLE {}(" \
                           "ID  int NOT NULL AUTO_INCREMENT, " \
                           "CONTENT  varchar(2048) NOT NULL, " \
                           "CRAWLED_REPLY_DATE  DATE NOT NULL, " \
                           "AUTHOR  varchar(255) NOT NULL, " \
                           "NOUNS_FROM_COMMENT varchar(1023) NOT NULL," \
                           "SENTIMENTAL int, " \
                           "PRIMARY KEY (ID))"
        return_schema_Query = Reply_ref_schema.format(reply_table_name)
        return return_schema_Query

    def Update_video_in_MEDIA_INFO_return_reply_table(self, VIDEO_URL, VIDEO_TITLE, NUM_OF_REPLY, VIEWS,
                                                      CRAWLED_DATE, LIKES,
                                                      HATES, NUM_OF_SUBSCIBER):
        self.check_connect_and_reconnect()


        media_info_update_Query = 'update {} set VIDEO_TITLE="{}", NUM_OF_REPLY={}, VIEWS={}, CRAWLED_DATE="{}", ' \
                                  'LIKES={}, HATES={}, NUM_OF_SUBSCIBER={} where VIDEO_URL="{}"'.format(
            self.video_table_name, VIDEO_TITLE, NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES, HATES, NUM_OF_SUBSCIBER,
            VIDEO_URL)
        self.execQuery(media_info_update_Query)
        print("update success {}".format(VIDEO_TITLE))
        media_info_select_reply_query = 'select {} from {} where VIDEO_URL="{}"'.format(self.Reply_ref_table,
                                                                                        self.video_table_name,
                                                                                        VIDEO_URL)
        Reply_ref_table_name = self.execQuery(media_info_select_reply_query)[0][0]
        return Reply_ref_table_name

    def Insert_video_in_MEDIA_INFO_return_Reply_table_name(self, MODEL_NAME, CHANNEL_URL, CHANNEL_NAME, VIDEO_TITLE,
                                                           VIDEO_URL, NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES,
                                                           HATES,
                                                           NUM_OF_SUBSCIBER, VIDEO_DESCRIPTION, VIDEO_POSTED_DATE,
                                                           CATEGORY):
        self.check_connect_and_reconnect()


        # 해당 비디오 튜플이 없을 때
        # insert를 한다.
        # 예제 insert into {} values("a", "b", "c", "d", "e", 2, 4, "2010-10-11", 144, 12523, 19999999, "설명", "2010-10-11", "ca", "asdf").format(media_info_insert_format)
        print("insert 입문")
        REPLY_REF_TABLE = self.__Name_generator_reply_ref_table(MODEL_NAME, VIDEO_URL)
        DA_CATEGORY = self.__defined_CATEGORY(MODEL_NAME)
        media_info_insert_format = "MEDIA_INFO(MODEL_NAME, CHANNEL_URL, CHANNEL_NAME, VIDEO_TITLE, VIDEO_URL, " \
                                   "NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES, HATES, NUM_OF_SUBSCIBER, " \
                                   "VIDEO_DESCRIPTION, VIDEO_POSTED_DATE, CATEGORY, REPLY_REF_TABLE, DA_CATEGORY)"
        media_info_insert_Query = 'insert into {} values("{}", "{}", "{}", "{}", "{}", {}, {}, "{}", {}, {}, {}, ' \
                                  '"{}", "{}", "{}", "{}", "{}")'.format(
            media_info_insert_format, MODEL_NAME, CHANNEL_URL, CHANNEL_NAME, VIDEO_TITLE,
            VIDEO_URL, NUM_OF_REPLY, VIEWS, CRAWLED_DATE, LIKES, HATES, NUM_OF_SUBSCIBER,
            VIDEO_DESCRIPTION, VIDEO_POSTED_DATE, CATEGORY, REPLY_REF_TABLE, DA_CATEGORY)
        print("쿼리 던지기 전")
        print(media_info_insert_Query)
        self.execQuery(media_info_insert_Query)
        print("Insert success {}".format(VIDEO_TITLE))
        return_reply_table_name = REPLY_REF_TABLE

        reply_ref_table_schema_Query = self.__Generator_Reply_ref_table_schema(REPLY_REF_TABLE)
        self.execQuery(reply_ref_table_schema_Query)
        print("Create Ref table ({}) success {}".format(REPLY_REF_TABLE, VIDEO_TITLE))

        return return_reply_table_name

    def check_video_in_table(self, video_url):
        self.check_connect_and_reconnect()

        Query_string = ""

        Query_string = 'select {} from {} where VIDEO_URL="{}"'.format(self.Reply_ref_table, self.video_table_name,
                                                                       video_url)
        result_set = self.execQuery(Query_string)

        if (len(result_set) == 0):
            # 존재하는 video가 없음
            return False
        # 이미 생성된 video tuple이 있음
        else:
            return True

    def Insert_reply_info_by_table_name(self, table_name, content, crawled_reply_date, author):
        self.check_connect_and_reconnect()

        # 댓글 table 이름과 attribute 를 입력 받으면 DB 댓글 테이블에 넣어주고 1 -1
        reply_table_schema = "(CONTENT, CRAWLED_REPLY_DATE, AUTHOR, NOUNS_FROM_COMMENT)"
        Query_string = 'insert into {}{} values ("{}", "{}", "{}", "")'.format(table_name, reply_table_schema, content,
                                                                           crawled_reply_date, author)

        self.execQuery(Query_string)
        #print('Insert reply in table {} at {}'.format(table_name, crawled_reply_date))

    def get_num_of_reply_by_url(self, url):
        self.check_connect_and_reconnect()

        num_of_reply = 0
        Query = 'select num_of_reply from {} where VIDEO_URL="{}"'.format(self.video_table_name, url)
        result = self.execQuery(Query)
        num_of_reply = result[0][0]

        return num_of_reply

    def __defined_CATEGORY(self, MODEL_NAME):
        DA_CATEGORY = ""
        if MODEL_NAME in self.product_name:
            DA_CATEGORY = "IT/기기"
        else :
            DA_CATEGORY = "None"

        return DA_CATEGORY

    def check_connect_and_reconnect(self):
        if self.__conn.open :
            pass
        else :
            self.__conn = self.getConnection()

    def test(self):
        pass
        # print(self.get_num_of_reply_by_url("asdf"))
        # a = self.Insert_reply_info_by_table_name('hi', '이거시 컨텐츠', '2010-10-12', '경수')
        # print(a)
        # ab = self.Insert_video_in_MEDIA_INFO_return_Reply_table_name("갤럭시 9", "b", "c", "제목임니다ㅏㅏ", "https://www.youtube.com/watch?v=2CeurT8vjU0", 2, 4, "2010-10-11", 144, 12523, 19999999, "설명", "2010-10-11", "ca")
        # print(ab)
        # print(self.check_video_in_table("asdf"))
        # print(self.Update_video_in_MEDIA_INFO_return_reply_table('asdf', "바뀐 제목2", 1000, 2399, '2010-10-15', 199, 100, 5999))

if __name__ == '__main__':
    DB = DBcontroller()
    DB.test()

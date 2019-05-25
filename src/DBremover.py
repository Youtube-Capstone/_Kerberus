
import pymysql

class DBremover:
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

#        self.product_name = ["구글홈","아이폰 XS", "갤럭시 9", "엘지 G7", "엘지 그램 15 $
#        self.product_name_DB_version = ["go_s_home","ap_p_ipxs", "ss_p_s9", "lg_p_g7", "$

    def getConnection(self):
        try:
            conn = pymysql.connect(
                host=self.__hostname,
                port=self.__dbport,
                user=self.__dbuser,
                password=self.__password,
                db=self.__dbname,
                charset=self.__charset)
            return conn
        except Exception:
            print("genConnection : Error in Mysql or MariaDB connection")
            return (-1)

    
    def closeConn(self):
        pass

    def DBcommit(self):
        self.__conn.commit()

    def __execQuery(self, sqlQuery):
        try:
            with self.__conn.cursor() as cur:
                cur.execute(sqlQuery)
                result = cur.fetchall()
                self.DBcommit()
                return result
        except Exception:
            print("execQuery : Error in calling conn.cursor")
            self.closeConn()
            return ""

    def removeData(self):
        table_list = self.__execQuery("select REPLY_REF_TABLE from MEDIA_INFO")
        remove_list = []
        if len(table_list) == 0:
            print("비었음")
            return
        for idx in range(len(table_list)):
            remove_list.append(table_list[idx][0])
        for table_name in remove_list:
            self.__execQuery("drop table {}".format(table_name))
        self.__execQuery("delete from MEDIA_INFO")
        print("table 비우고 댓글 테이블 {}개 삭제완료".format(len(table_list)))
        
if __name__ == '__main__':
    DB = DBremover()
    DB.removeData()

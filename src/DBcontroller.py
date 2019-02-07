import urllib
import pymysql

##############################
## python DBcontroller 초안 ##
##############################


# Maria DB를 설치하여서 기본 port인 3306 포트에 올려둬야함
# 유용 링크 http://blog.naver.com/PostView.nhn?blogId=hmkuak&logNo=220583392375

class DBcontroller:
    def __init__(self):
        # connect
        self.conn = pymysql.connect(host='localhost', port=3306, user='root', password='lim',
                               db='test', charset='utf8')

    def execQuery(self, sqlString):
        try :
            with self.conn.cursor() as cur:
                cur.execute(sqlString)
        # except :
        finally :
            self.conn.close()

    def test(self):
        print("test case입니다.")
        try :
            with self.conn.cursor() as cur:

                # cursor란
                # cur = connect .cursor(pymysql.cursors.DictCursor)
                # print(row['name']) 이런식으로 원하는 열만 검색이 가능

                # test 라는 DATABASE안에 test_table이라는 테이블 만든 상태
                # scheme: ID int, Name varchar(15), Amount int

                # sql문 실행
                sql = "insert into test_table values (2, 'anyone', 40)"
                cur.execute(sql)

                sql = "update test_table set id=10 where id=2"
                cur.execute(sql)

                sql = "delete from test_table where id=11"
                cur.execute(sql)

                sql = "select * from test_table limit 10"
                # limit 10 이면 첫번째부터 10개만 가져옴
                # limit 100, 10 이면 100번째부터 10개만 가져옴
                cur.execute(sql)

                # sql 동적 활용
                # sql = "select * from testTable where no=%s and name=%s"
                # cur.execute(sql,(1,'홍길동')

                # DB결과를 모두 가져올 때 사용
                rows = cur.fetchall()

                # DB결과를 하나만 가져올 때
                # rows = cur.fetchone()

                # 한번에 다 출력
                print('한번에 다 출력:')
                print(rows)
                # for문으로 출력
                print('for문으로 출력')
                for row in rows : print(row)

        # except errortype as e:
        #     print(e)

        finally :
            # 연결 해제
            self.conn .close()

        # SQL 명령어 참고 : http://egloos.zum.com/kwon37xi/v/1634694

        # try:
        #     with conn.cursor() as cursor:
        #         cursor.execute(sql)
        #     conn.commit()
        # except errortype as e:
        #     print(e)
        # finally:
        #     conn.close()


if __name__ == '__main__':
    DB = DBcontroller()
    DB.test()
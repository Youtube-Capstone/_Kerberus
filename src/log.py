from DBcontroller import DBcontroller
import datetime

class log:
    def __init__(self):
        self.CRAWLED_DATE = datetime.datetime.today().strftime("%Y-%m-%d")
        self.dbc = DBcontroller()
        self.log_table_name = "LOG_INFO"
        self.WHOLE_DATA_COUNT_QUERY = "SELECT SUM(TABLE_ROWS) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='kbrs_db'"
# SELECT SUM(TABLE_ROWS)
# FROM INFORMATION_SCHEMA.TABLES
# WHERE TABLE_SCHEMA = 'kbrs_db';

    def count_log(self):
        result = self.dbc.execQuery(self.WHOLE_DATA_COUNT_QUERY)
        WHOLE_DATA_COUNT = result[0][0]

        check_select_Query = "select * from {} where CRAWLED_DATE='{}'".format(self.log_table_name, self.CRAWLED_DATE)
        check_result = self.dbc.execQuery(check_select_Query)

        if (len(check_result) == 0):
            insert_Query = "INSERT INTO {} values({}, '{}')".format(self.log_table_name, WHOLE_DATA_COUNT, self.CRAWLED_DATE)
            self.dbc.execQuery(insert_Query)
        else :
            update_Query = "update {} set WHOLE_DATA_COUNT={} where CRAWLED_DATE='{}'".format(self.log_table_name, WHOLE_DATA_COUNT, self.CRAWLED_DATE)
# update {} set VIDEO_TITLE="{}", NUM_OF_REPLY={}, VIEWS={}, CRAWLED_DATE="{}", ' \
#                                   'LIKES={}, HATES={}, NUM_OF_SUBSCIBER={} where VIDEO_URL="{}"
            self.dbc.execQuery(update_Query)

if __name__ == '__main__':
    logger = log()
    logger.count_log()


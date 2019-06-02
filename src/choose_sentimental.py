from DBcontroller import DBcontroller


def make_sentimental_table(table_name, dbc):
    CREATE_QUERY="""
CREATE TABLE {} (
   ID  int NOT NULL,
   CONTENT  varchar(2048) NOT NULL,
   CRAWLED_REPLY_DATE DATE NOT NULL,
   AUTHOR  varchar(255) NOT NULL,
   NOUNS_FROM_COMMENT varchar(1023) NOT NULL,
   SENTIMENTAL int
)
    """.format(table_name)
    dbc.execQuery(CREATE_QUERY)
def insert_sentimental_summery():
    dbc = DBcontroller()
    model_info = dbc.execQuery("select MODEL_NAME, MODEL_CODE from MODEL_INFO")
    for model_idx in range(len(model_info)):
        model_name = model_info[model_idx][0]
        model_code = model_info[model_idx][1]
        good_table_name = model_code + "_SENTIMENTAL_GOOD"
        bad_table_name = model_code + "_SENTIMENTAL_BAD"
        dbc.execQuery("update MODEL_INFO set GOOD='{}' where MODEL_NAME='{}'".format(good_table_name, model_name))
        dbc.execQuery("update MODEL_INFO set BAD='{}' where MODEL_NAME='{}'".format(bad_table_name, model_name))
        reply_ref_tables = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME='{}'".format(model_name))
        make_sentimental_table(good_table_name, dbc)
        make_sentimental_table(bad_table_name, dbc)
        for idx in range(len(reply_ref_tables)):
            reply_table_name = reply_ref_tables[idx][0]

            reply_good = dbc.execQuery("insert into {} (select * from {} where SENTIMENTAL > 3)".format(good_table_name, reply_table_name))
            reply_bad = dbc.execQuery("insert into {} (select * from {} where SENTIMENTAL < -3)".format(bad_table_name, reply_table_name))

def get_sentimental(model_name_input):
    model_name = model_name_input
    dbc = DBcontroller()
    good = 0
    bad = 0
    reply_ref_tables = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME='{}'".format(model_name))

    for reply_table_index in range(len(reply_ref_tables)):
        reply_table = reply_ref_tables[reply_table_index][0]
        sentimental_array = dbc.execQuery("select SENTIMENTAL from {}".format(reply_table))
        for idx in range(len(sentimental_array)):
            sentimental = sentimental_array[idx][0]
            if (sentimental == None):
                continue
            elif (sentimental < 0) :
                bad = bad + sentimental
            elif (sentimental > 0) :
                good = good + sentimental

    model_infos = dbc.execQuery(
        "select MODEL_NAME, COUNT(MODEL_NAME), SUM(NUM_OF_REPLY) from MEDIA_INFO where MODEL_NAME='{}' GROUP BY MODEL_NAME".format(
            model_name))

    num_of_video = model_infos[0][1]
    num_of_reply = model_infos[0][2]
    print(model_name, good, bad, num_of_video, num_of_reply)

# dbc = DBcontroller()
# for idx in range(1303, 1312):
#     table_name = 'ap_p_ipxs_'+str(idx)
#     dbc.execQuery("delete from MEDIA_INFO where REPLY_REF_TABLE like '{}'".format(table_name))
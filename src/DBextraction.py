
from DBcontroller import DBcontroller
import pymysql

def get_comment_by_model(file=False):
    dbc = DBcontroller()

    models = dbc.execQuery("select distinct MODEL_NAME from MEDIA_INFO")
    model_count = len(models)
    model_list = []
    model_comment_array = [[] for _ in range(model_count)]
    for idx in range(model_count):
        model_list.append(models[idx][0])
    for idx in range(model_count):
        table_names = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME='{}'".format(model_list[idx]))
        for idx_table in range(len(table_names)):
            now_table = table_names[idx_table][0]
            comments = dbc.execQuery("select CONTENT from {}".format(now_table))
            for comment in comments:
                model_comment_array[idx].append(comment[0])

    model_n_comment = zip(model_list, model_comment_array)

    if (file == True):
        for model_name, comments in model_n_comment:
            f = open(model_name+".txt", 'w', encoding='utf-8')
            print(model_name)
            for comment in comments:
                f.write(comment)
                f.write("\n==============\n")

    return model_n_comment

def whole_comment_to_txt_file():
    dbc = DBcontroller()
    comment_table_list = []
    f = open("result.txt", 'w', encoding='utf-8')
    count_ = 0

    result = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO")

    for a in result:
        comment_table_list.append(a[0])

    # for table in commit_table_list:
    #     result = dbc.execQuery("select CONTENT from {}".format(table))
    #     target_comment = result[0][0]
    #     count_ = len(result) + count_

    # first = len(count_)//3
    # second
    # third
    for table in comment_table_list:
        result = dbc.execQuery("select CONTENT from {}".format(table))
        for a in result:
            target_comment = a[0].replace("\n", " ")
            f.write(str(target_comment))
            f.write("\n")
            count_ = len(a) + count_
        print(count_)

    f.close()
def comment_proto():

    modelname = '아이폰 XS'
    output = 'a.txt'

    f = open("./"+output,"w",encoding='utf-8')
    dbc = DBcontroller()
    result = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME='{}'".format(modelname))
    video_count = len(result)
    commend_count = 0
    for val in result:
        # val[0]
        now = dbc.execQuery("select CONTENT from {}".format(val[0]))
        commend_count = len(now) + commend_count
        for b in now:
            if (len(b) == 0):
                pass
            else :
                f.write(b[0])
                f.write("\n============================================================================================\n")

    f.close()
    print("모델 : ", modelname)
    print(video_count, "개의 동영상의", commend_count, "개의 댓글을 ", output, "에 저장하였음")
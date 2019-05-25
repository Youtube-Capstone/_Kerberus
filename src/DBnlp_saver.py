from DBcontroller import DBcontroller
from analysis import analysis

class DBnlp_saver:
    def __init__(self):
        self.dbc = DBcontroller()
        self.mecab = analysis()
        # self.mecab.getnouns(comment)
        self.product_name = ["구글홈","아이폰 XS", "갤럭시 S9", "엘지 G7", "엘지 그램 15 2018", "삼성 노트북 9 always", "갤럭시탭 S4", "아이패드 6세대", "아이패드 프로 3세대"]
        self.product_name_DB_version = ["go_s_home","ap_p_ipxs", "ss_p_s9", "lg_p_g7", "lg_n_gram15", "ss_n_alwy9", "ss_t_galtap4", "ap_t_ipd6", "ap_t_pro3"]

    def comment_to_result_of_nlp(self):
        model_names = self.get_model_names()
        for model_name in model_names:
            bool_exist_table = self.boolean_exist_table(model_name)
            if (bool_exist_table):
                pass
            else :
                self.make_frequency_table_by_model(model_name)
            reply_table_names = self.get_table_name_by_model(model_name)
            for reply_table_name in reply_table_names:
                replies = self.dbc.execQuery("select CONTENT, ID from {}".format(str(reply_table_name)))
                for idx in range(len(replies)):
                    #merge_nouns_by_comma = ""
                    reply = replies[idx][0]
                    ID = replies[idx][1]
                    nouns = self.mecab.mecabnouns(str(reply))
                    if (len(nouns) == 0):
                        pass
                    else :
                        for noun in nouns:
                            self.register_frequency_word_in_table(model_name=model_name, word=noun)
                            #merge_nouns_by_comma = merge_nouns_by_comma + noun + ", "
                        #merge_nouns_by_comma = merge_nouns_by_comma[:-2]
                    #update_reply_table = "update {0} set NOUNS_FROM_COMMENT='{1}' where ID={2}"
                    #update_query = update_reply_table.format(reply_table_name, merge_nouns_by_comma, ID)
                    #self.dbc.execQuery(update_query)

    def add_colmn_nlp_result_REPLY_REF_TABLE(self):
        col_info = "NOUNS_FROM_COMMENT varchar(1023) NOT NULL"
        model_names = self.get_model_names()
        idx = 0
        for model_name in model_names:
            reply_table_names = self.get_table_name_by_model(model_name)
            for table_name in reply_table_names:
                print("alter table {0} add {1}".format(table_name, col_info))
                self.dbc.execQuery("alter table {0} add {1}".format(table_name, col_info))
                print("alter table {0} add {1}".format(table_name, col_info))
                idx = idx + 1
        print("add_colmn_complete : ", idx)

## 아래로는 사용하는 자체 method이다.

    def get_model_names(self):
        model_names = []
        model_name_array = self.dbc.execQuery("select distinct MODEL_NAME from MEDIA_INFO")
        for idx in range(len(model_name_array)):
            model_names.append(model_name_array[idx][0])
        return model_names

    def get_table_name_by_model(self, model_name=None):
        reply_tables = []
        if model_name == None:
            reply_table_array = self.dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO")
        else :
            reply_table_array = self.dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME='{}'".format(model_name))
        for idx in range(len(reply_table_array)):
            reply_tables.append(reply_table_array[idx][0])
        return reply_tables

    def make_frequency_table_by_model(self, model_name):
        table_name = self.get_table_name(model_name)
        schema_create_query ="""
        CREATE TABLE {}(
          WORD varchar(63) NOT NULL,
          FREQUENCY int NOT NULL,

          PRIMARY KEY (WORD)
        )
        """
        schema =  schema_create_query.format(table_name)

        self.dbc.execQuery(schema)

    def boolean_exist_table(self, model_name):
        table_name = self.get_table_name(model_name)
        result = self.dbc.execQuery("select * from {}".format(table_name))
        if (len(result) == 0):
            return False
        else : return True

    def get_table_name(self, model_name):
        model_code = ""
        for idx in range(len(self.product_name)):
            if (model_name == self.product_name[idx]):
                model_code = self.product_name_DB_version[idx]
        table_name = str(model_code) + "_FREQUENCY"
        return table_name

    def register_frequency_word_in_table(self, model_name, word):
        table_name = self.get_table_name(model_name)
        result = self.dbc.execQuery("select FREQUENCY from {} where WORD='{}'".format(table_name, word))
        if (len(result) == 0):
            self.insert_noun_frequency_table(model_name, word)
        else :
            FREQUENCY = result[0][0]
            self.update_noun_frequency_table(model_name, word, FREQUENCY)

    def insert_noun_frequency_table(self, model_name, word):
        table_name = self.get_table_name(model_name)
        self.dbc.execQuery("insert into {0} values('{1}', {2})".format(table_name, word, 1))

    def update_noun_frequency_table(self, model_name, word, FREQUENCY):
        table_name= self.get_table_name(model_name)
        new_FREQUENCY = FREQUENCY+1
        self.dbc.execQuery("update {0} set FREQUENCY={1} where WORD='{2}'".format(table_name, new_FREQUENCY, word))



if __name__ == "__main__":
    nlp_saver = DBnlp_saver()
#    nlp_saver.add_colmn_nlp_result_REPLY_REF_TABLE()
    nlp_saver.comment_to_result_of_nlp()




# 아래 코드는 로컬 모듈 용입니다.

class analysis_lsh:
    def __init__(self):
        self.mecab = Mecab("C:\mecab\mecab-ko-dic")

    def getpos(self,comment):
        pos = self.mecab.pos(comment)
        return pos

    def getnouns(self,comment):
        nouns = self.mecab.nouns(comment)
        return nouns

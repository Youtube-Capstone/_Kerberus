from DBcontroller import DBcontroller
from morpheme import analysis
from collections import Counter

class get_stemmed_comment:
    def __init__(self):
        self.dbc = DBcontroller()
        self.analysis = analysis()


    def get_content_by_model(self):
        dbc = self.dbc
        #model_names = self.get_model_name()
        model_names = [['삼성 노트북 9 always',0]]
        self.model_frequency_word = [[] for _ in range(len(model_names))]
        nouns = ["NNG", "NNP"]
        Vernacular = ["VV", "VA"]
        etc = ["MM", "MAG", "IC", "XR"]
        self.check_type = nouns + Vernacular + etc

        for model_idx in range(len(model_names)):
            model_name = model_names[model_idx][0]
            reply_ref_tables = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME='{}'".format(model_name))
            for idx in range(len(reply_ref_tables)):
                reply_table_name = reply_ref_tables[idx][0]
                reply_contents = dbc.execQuery("select CONTENT from {}".format(reply_table_name))
                for idx_r in range(len(reply_contents)):
                    reply_content = reply_contents[idx_r][0]
                    self.content_with_mecab(reply_content, model_idx)
                #################################################

        whole_word = self.model_frequency_word


        for idx in range(len(model_names)):
            freq_table_name = self.make_frequency_table(model_names[idx])
            counter = Counter(whole_word[idx])
            for word, freq in counter.most_common():
                dbc.execQuery("insert into {} values('{}', {})".format(freq_table_name, word, freq))

    def make_frequency_table(self, model_name):
        model_name_o = model_name[0]
        model_code = "__"
        dbc = self.dbc
        for idx in range(len(dbc.product_name)):
            if dbc.product_name[idx] == model_name_o:
                model_code = dbc.product_name_DB_version[idx]

        Query = """
CREATE TABLE {}_FREQUENCY_WEB(
  WORD varchar(127) NOT NULL,
  FREQUENCY int NOT NULL,

  PRIMARY KEY (WORD)
)""".format(model_code)
        dbc.execQuery(Query)
        table_name = "{}_FREQUENCY_WEB".format(model_code)
        return table_name

    def get_model_name(self):
        dbc = self.dbc
        model_names = dbc.execQuery("select distinct MODEL_NAME from MEDIA_INFO")
        return model_names

    def content_with_mecab(self, content, model_idx):
        analysis = self.analysis
        result_morpheme = analysis.mecabpos(content)
        # print(result)

        # Counter(list)
        for word, parts in result_morpheme:
            if (parts in self.check_type):
                word_original = analysis.oktpos(word)
                self.model_frequency_word[model_idx].append(word_original[0][0])


content = get_stemmed_comment()
content.get_content_by_model()

# a = Counter(["red", "red", "a", "b"])
# print(type(a))
# for c, d in a.most_common():
#     print(c, d)

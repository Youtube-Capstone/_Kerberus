from sklearn.feature_extraction.text import CountVectorizer
from slkearn.feature_extraction.text import TfidfVectorizer
from DBcontroller import DBcontroller
from hanspell import spell_checker
import re

if __name__=='__main__':
    count_vect = CountVectorizer()
    tddf_vect = TfidfVectorizer()

    nscharacter = re.compile('[^a-zA-Z0-9`~!@#$%^&*()-=_+{}\[\],./<>?;\'":|\\\]+')
    dbc = DBcontroller()
    sentences = []

    product_name = dbc.execQuery("select DISTINCT MODEL_NAME from MEDIA_INFO")
    for product in product_name:
        COMMENT_TABLE = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME = '{}'".format(product[0]))
        for TABLE in COMMENT_TABLE:
            COMMENT = dbc.execQuery("select CONTENT from {}".format(TABLE[0]))
            for TEXT in COMMENT:
                REPLACE_TEXT = TEXT[0].replace('\\', '\\\\').replace('"', '\\"')
                try:
                    check = spell_checker.check(REPLACE_TEXT)
                    reduction = "".join(nscharacter.findall(check.checked))
                    sentences.append(reduction)
                except:
                    reduction = "".join(nscharacter.findall(REPLACE_TEXT))
                    sentences.append(reduction)
        break
    count_vect.fit(sentences)
    print(count_vect.vocabulary_)

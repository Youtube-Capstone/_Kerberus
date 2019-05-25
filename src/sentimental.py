from DBcontroller import DBcontroller
from KnuSentiLex.knusl import KnuSL
from hanspell import spell_checker
from gensim.models.word2vec import Word2Vec
from morpheme import analysis
import re

if __name__=='__main__':
    nscharacter = re.compile('[^a-zA-Z0-9`~!@#$%^&*()-=_+{}\[\],./<>?;\'":|\\\]+')
    corpos = analysis()
    ksl = KnuSL
    dbc = DBcontroller()

    product_name = dbc.execQuery("select DISTINCT MODEL_NAME from MEDIA_INFO")
    for product in product_name:
        #comment_file = open('./'+product+'.txt','w',encoding="utf8")
        COMMENT_TABLE = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME = '{}'".format(product[0]))
        for TABLE in COMMENT_TABLE:
            COMMENT = dbc.execQuery("select CONTENT from {}".format(TABLE[0]))
            for TEXT in COMMENT:
                score = []
                try:
                    check = spell_checker.check(TEXT[0])
                    reduction = "".join(nscharacter.findall(check.checked))
                    words = corpos.mecabpos(reduction)
                except:
                    reduction = "".join(nscharacter.findall(TEXT[0]))
                    words = corpos.mecabpos(reduction)

                while True:

                    for idx in range(len(words)):
                        if words[idx][1] == 'VA' and idx+1 != len(words):
                            front = words[idx]
                            back = words[idx+1]
                            del words[idx+1]
                            del words[idx]
                            combine = (front[0]+back[0],front[1]+'+'+back[1])
                            words.insert(idx,combine)
                            break

                    if idx+1 == len(words) or len(words) == 0:
                        break

                for word in words:
                    if 'VA' in word[1] or 'XR' in word[1]:
                        value = ksl.data_list(corpos.oktpos(word[0])[0][0])
                        if value != None:
                            score.append(value)

                if score:
                   try:
                      dbc.execQuery("UPDATE {} SET SENTIMENTAL={} WHERE CONTENT='{}'".format(TABLE[0],sum(score),TEXT[0]))                
                   except:
                      dbc.execQuery("UPDATE {} SET SENTIMENTAL={} WHERE CONTENT=\"{}\"".format(TABLE[0],sum(score),TEXT[0]))

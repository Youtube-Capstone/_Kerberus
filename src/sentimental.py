from DBcontroller import DBcontroller
from KnuSentiLex.knusl import KnuSL
from hanspell import spell_checker
from morpheme import analysis
import re

if __name__=='__main__':
    nscharacter = re.compile('[^a-zA-Z0-9`~@#$%^&*()-=_+{}\[\],/<>;\'":|\\\]+')
    corpos = analysis()
    ksl = KnuSL
    dbc = DBcontroller()

    product_name = dbc.execQuery("select DISTINCT MODEL_NAME from MEDIA_INFO")
    for product in product_name:
        COMMENT_TABLE = dbc.execQuery("select REPLY_REF_TABLE from MEDIA_INFO where MODEL_NAME = '{}'".format(product[0]))
        for TABLE in COMMENT_TABLE:
            COMMENT = dbc.execQuery("select CONTENT from {}".format(TABLE[0]))
            #COMMENT = dbc.execQuery("select CONTENT from {} where SENTIMENTAL='NULL'".format(TABLE[0]))
            for TEXT in COMMENT:
                score = 0
                neg = 0
                pos = 0

                REPLACE_TEXT = TEXT[0].replace('\\', '\\\\').replace('"', '\\"')
                try:
                    check = spell_checker.check(REPLACE_TEXT)
                    reduction = "".join(nscharacter.findall(check.checked))
                    #words = corpos.mecabpos(reduction)
                except:
                    reduction = "".join(nscharacter.findall(REPLACE_TEXT))
                    #words = corpos.mecabpos(reduction)

                value = ksl.data_list(reduction)

                if value:
                    for val in value:
                        if val > 0:
                            pos += 1
                        elif val < 0:
                            neg += 1
                        else:
                            continue

                    if pos > neg:
                        score = pos-neg
                    elif neg > pos:
                        score = -(neg-pos)
                    else:
                        continue 

                if score:
                   dbc.execQuery('UPDATE {} SET SENTIMENTAL={} WHERE CONTENT="{}"'.format(TABLE[0],score,REPLACE_TEXT))                

            print("{} finish".format(TABLE[0]))
        print("{} finish".format(product[0]))

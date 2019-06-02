from DBcontroller import DBcontroller
from hanspell import spell_checker
from morpheme import analysis
import re

if __name__ == '__main__':
    dbc = DBcontroller()
    nscharacter = re.compile('[^a-zA-Z0-9`~!@#$%^&*()-=_+{}\[\],./<>?;\'":|\\\]+')
    corpos = analysis()

    Querys = dbc.execQuery("select CONTENT from ap_p_ipxs_870")
    Result_list = []
    for tmp in Querys:
        Result_list.append(tmp[0])

    for result in Result_list:
        REPLACE_TEXT = result.replace('\\', '\\\\').replace('"', '\\"')
        try:
            check = spell_checker.check(REPLACE_TEXT)
            reduction = "".join(nscharacter.findall(check.checked))
            words = corpos.mecabpos(reduction)
        except:
            reduction = "".join(nscharacter.findall(REPLACE_TEXT))
            words = corpos.mecabpos(reduction)

        print(words)
        '''
            CONTENT = dbc.execQuery("select CONTENT FROM {} where CONTENT like '%보겸%'".format(result))
            for text in CONTENT:
                print(text)
        '''

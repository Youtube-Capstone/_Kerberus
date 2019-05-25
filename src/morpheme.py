
from konlpy.tag import Mecab
from konlpy.tag import Okt

class analysis:
    def __init__(self,dict=None):
        if dict == None:
            self.mecab = Mecab()
        else :
            self.mecab = Mecab(dicpath=dict)
        self.okt = Okt()

    def mecabpos(self,comment):
        pos = self.mecab.pos(comment)
        return pos

    def mecabnouns(self,comment):
        nouns = self.mecab.nouns(comment)
        return nouns

    def oktpos(self,comment):
        pos = self.okt.pos(comment, norm=True, stem=True)
        return pos

    def oktnouns(self,comment):
        nouns = self.okt.nouns(comment)
        return nouns

if __name__ == '__main__':
    corpos = analysis()
    print(corpos.mecabpos("안녕하십니까ㅋㅋ"))


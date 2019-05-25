# KNU 한국어 감성사전
# 작성자 : 온병원, 박상민, 나철원
# 소속 : 군산대학교 소프트웨어융합공학과 Data Intelligence Lab
# 홈페이지 : dilab.kunsan.ac.kr
# 작성일 : 2018.05.14
# 뜻풀이 데이터 출처 : https://github.com/mrchypark/stdkor
# 신조어 데이터 출처 : https://ko.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%EC%9D%98_%EC%9D%B8%ED%84%B0%EB%84%B7_%EC%8B%A0%EC%A1%B0%EC%96%B4_%EB%AA%A9%EB%A1%9D
# 이모티콘 데이터 출처: https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98
# SentiWordNet_3.0.0_20130122 데이터 출처 : http://sentiwordnet.isti.cnr.it/
# SenticNet-5.0 데이터 출처 : http://sentic.net/
# 감정단어사전0603 데이터 출처 : http://datascience.khu.ac.kr/board/bbs/board.php?bo_table=05_01&wr_id=91
# 김은영, “국어 감정동사 연구”, 2004.02, 학위논문(박사) - 전남대학교 국어국문학과 대학원
# -*-coding:utf-8-*-

import json
import hgtk

class KnuSL():

    def data_list(wordname):
        with open('./KnuSentiLex/data/SentiWord_info.json','r',encoding='utf-8-sig') as f:
            data = json.load(f)

        result = None
        for i in range(0, len(data)):
            if not hgtk.checker.is_hangul(data[i]['word'].replace(' ','')):
                continue
            elif hgtk.letter.decompose(wordname[0])[0] != hgtk.letter.decompose(data[i]['word'][0])[0]:
                continue
            else:
                if wordname in data[i]['word'] or wordname in data[i]['word_root']:
                    result = int(data[i]['polarity'])
                    break
                    # result.append(data[i]['word_root'])
                    # result.append(data[i]['polarity'])

        # r_word = result[0]  # 어근
        s_word = result  # 극성

        return s_word
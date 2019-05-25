# Crawling TA(Text Analysis) Server

    역할 : 유투브상에 존재하는 웹 데이터를 크로울링하여 형태소 분석 및 감정 분석 결과를 데이터베이스 서버가 받아 들일 수 있도록 정제하여 전달함

## 접속 방법

    Capstone.pem (Private key) 공유를 통해서 다음의 명령어로 접속 (Security/Capstome.pem)
    
    ssh -i <Path/To/Capstone.pem> ubuntu@ec2-3-112-83-173.ap-northeast-1.compute.amazonaws.com

    

## 서버 구성

    pyenv 파이썬 환경 매니저를 통해 3.6.0버전에서 개발 진행.

    'capstone' 이름의 파이썬 가상환경 이용.

## pyenv 명령어

    # 필요한 파이썬 버전 설치
    $ pyenv install <python version>

    # 파이썬 가상환경 구축
    $ pyenv virtualenv <python version> <virtualenv name>

    # 파이썬 가상환경 실행
    $ pyenv activate <virtualenv name>
 
    # 파이썬 가상환경 해제
    $ pyenv deactivate <virtualenv name>

    

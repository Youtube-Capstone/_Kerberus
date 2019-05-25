# AWS RDS MariaDB Server

    역할 : TA Server가 전송하는 정제된 분석 데이터를 저장하고 웹 서버가 호출하는 데이터를 쿼리하여 전송함.

## 접속 방법

    # TA Server와 Web Server를 통해서만 접근 할 수 있도록 설정.

    # 접속 명령어 (Terminal)
    mysql -h youtube-db-plz.chrss0yvchv7.ap-northeast-1.rds.amazonaws.com -P 3306 -u kbrs -p (tjdwns12!!)


## 서버 구성

    MariaDB

    Character Set = "UTF-8"

    퍼블릭 엑세스 접근을 차단하고 VPC 보안 그룹을 통해 TA , WEB 서버를 통해서만 접근하도록 구성함.

    

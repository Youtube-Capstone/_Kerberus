# DB_Schema_Summary

## 구상

> 모델명으로 검색된 각각의 모델에 대한 영상은 MEDIA_INFO 테이블에 데이터가 입력되며 해당 영상들에 대한 댓글들은 모델명 단위로 생성된 테이블에 
입력된다. 

> Module Name
 - Apple_iPhoneXS
 - Samsung_Galaxy9
 - LG_G7
 - LG_Gram15_2018
 - Samsung_Notebook9
 - Samsung_GalaxyTab_S4
 - Apple_iPad_S6
 - Apple_iPad_Pro_S3
 
## TABLE Description

> **MEDIA_INFO**
~~~
    
    +-------------------+--------------+------+-----+---------+----------------+
    | Field             | Type         | Null | Key | Default | Extra          |
    +-------------------+--------------+------+-----+---------+----------------+
    | ID                | int(11)      | NO   | PRI | NULL    | auto_increment |
    | MODEL_NAME        | varchar(255) | NO   |     | NULL    |                |
    | CHANNEL_URL       | varchar(255) | NO   |     | NULL    |                |
    | CHANNEL_NAME      | varchar(255) | NO   |     | NULL    |                |
    | VIDEO_TITLE       | varchar(255) | NO   |     | NULL    |                |
    | VIDEO_URL         | varchar(255) | NO   |     | NULL    |                |
    | NUM_OF_REPLY      | int(11)      | NO   |     | NULL    |                |
    | VIEWS             | int(11)      | NO   |     | NULL    |                |
    | CRAWLED_DATE      | date         | NO   |     | NULL    |                |
    | LIKES             | int(11)      | NO   |     | NULL    |                |
    | HATES             | int(11)      | NO   |     | NULL    |                |
    | NUM_OF_SUBSCIBER  | int(11)      | NO   |     | NULL    |                |
    | VIDEO_DESCRIPTION | varchar(255) | NO   |     | NULL    |                |
    | VIDEO_POSTED_DATE | date         | NO   |     | NULL    |                |
    | CATEGORY          | varchar(255) | NO   |     | NULL    |                |
    | REPLY_REF_TABLE   | varchar(255) | NO   |     | NULL    |                |
    +-------------------+--------------+------+-----+---------+----------------+
    
~~~

> **<REPLY_REF_TABLE>**

~~~

    +--------------------+---------------+------+-----+---------+----------------+
    | Field              | Type          | Null | Key | Default | Extra          |
    +--------------------+---------------+------+-----+---------+----------------+
    | ID                 | int(11)       | NO   | PRI | NULL    | auto_increment |
    | CONTENT            | varchar(2048) | NO   |     | NULL    |                |
    | CRAWLED_REPLY_DATE | date          | NO   |     | NULL    |                |
    | AUTHOR             | varchar(255)  | NO   |     | NULL    |                |
    +--------------------+---------------+------+-----+---------+----------------+
    
~~~


> **<DB backup>**
 
mysqldump -u {db_user} -p --databases {db_name} > /home/{user}/my.dump.sql
 
 Exmaple :  mysqldump.exe -u kbrs -h youtube-db-plz.chrss0yvchv7.ap-northeast-1.rds.amazonaws.com -p --databases kbrs_db > /mnt/c/Users/임승현/kbrs_db_back_190330.dump.sql

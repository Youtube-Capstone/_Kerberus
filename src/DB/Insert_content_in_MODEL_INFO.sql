
CREATE TABLE MODEL_INFO (
  ID int not NULL AUTO_INCREMENT,
  MODEL_NAME varchar(255) NOT NULL,
  PICTURE_URL varchar(1047) NOT NULL,
  COMPANY varchar(255) NOT NULL,
  MODEL_CODE varchar(255) NOT NULL,
  PRODUCT_TYPE_OF_MODEL varchar(255) NOT NULL,

  PRIMARY KEY (ID)
);


-- INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
-- values()


INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("아이폰 XS", "https://file.bodnara.co.kr/logo/insidelogo.php?image=%2Fhttps%3A%2F%2Ffile.bodnara.co.kr%2Fwebedit%2Fhardward%2Fmobile%2F20181114_iphonexs%2Fimg_8476.jpg",
"apple", "ap_p_ipxs", "phone");

INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("갤럭시 S9", "https://images.samsung.com/is/image/samsung/sec-galaxy-s9-g960-sm-g960ngbakoo-Front-129083942?$PD_GALLERY_L_JPG$",
"samsung", "ss_p_s9", "phone");

INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("엘지 G7", "https://o.aolcdn.com/images/dims?quality=85&image_uri=http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F968c788f159098a13325f15758167b9d%2F206322535%2Flg-g7-thinq-evleaks.jpg&client=amp-blogside-v2&signature=6b02e53019bb54a462f846247a7a1798e8417fe5",
"LG", "lg_p_g7", "phone");

INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("엘지 그램 15 2018", "https://t1.daumcdn.net/cfile/tistory/99FD11425B0E6EC630",
"LG", "lg_n_gram15", "notebook");

INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("삼성 노트북 9 always", "https://images.samsung.com/is/image/samsung/sec-notebook-nt900x5t-x78l-nt900x5t-x78l-frontsilver-84180080?$PD_GALLERY_L_JPG$",
"samsung", "ss_n_alwy9", "notebook");

INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("갤럭시탭 S4", "http://thegear.mygoodnews.com/imgdata/thegear_co_kr/201808/2018080156378752.jpg",
"samsung", "ss_t_galtap4", "tablet");

INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("아이패드 6세대","https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/hero/ipad-hero-unselected-201803_GEO_KR?wid=490&amp;hei=674&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1538436178684",
"apple", "ap_t_ipd6", "tablet");

INSERT into MODEL_INFO(MODEL_NAME, PICTURE_URL, COMPANY, MODEL_CODE, PRODUCT_TYPE_OF_MODEL) 
values("아이패드 프로 3세대","https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/pro/ipad-pro-12-11-select-201810_GEO_KR?wid=435&amp;hei=550&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1540576022267",
"apple", "ap_t_pro3", "tablet");





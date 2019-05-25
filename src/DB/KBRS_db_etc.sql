




-- -- -- MODEL_INFO attribute 추가 및 데이터 업데이트
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = '___FREQUENCY_WEB' where MODEL_CODE = 'lg_n_gram15'
--
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = 'ap_p_ipxs_FREQUENCY_WEB' where MODEL_CODE = 'ap_p_ipxs';
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = 'ap_t_ipd6_FREQUENCY_WEB' where MODEL_CODE = 'ap_t_ipd6';
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = 'ap_t_pro3_FREQUENCY_WEB' where MODEL_CODE = 'ap_t_pro3';
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = 'lg_p_g7_FREQUENCY_WEB' where MODEL_CODE = 'lg_p_g7';
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = 'ss_p_s9_FREQUENCY_WEB' where MODEL_CODE = 'ss_p_s9';
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = 'ss_t_galtap4_FREQUENCY_WEB' where MODEL_CODE = 'ss_t_galtap4';
-- update MODEL_INFO set FREQUENCY_TABLE_NAME = 'ss_n_alwy9_FREQUENCY_WEB' where MODEL_CODE = 'ss_n_alwy9';
--
--
--  ___FREQUENCY_WEB           | 그램
-- | ap_p_ipxs_FREQUENCY_WEB    |
-- | ap_t_ipd6_FREQUENCY_WEB    |
-- | ap_t_pro3_FREQUENCY_WEB    |
-- | lg_p_g7_FREQUENCY_WEB      |
-- | ss_p_s9_FREQUENCY_WEB      |
-- | ss_t_galtap4_FREQUENCY_WEB
--
-- alter table MODEL_INFO add column FREQUENCY_TABLE_NAME varchar(255) NOT NULL
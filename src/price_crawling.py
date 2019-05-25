import requests
from DBcontroller import DBcontroller
from bs4 import BeautifulSoup

if __name__ == '__main__':
    dbc = DBcontroller()

    model_name = dbc.execQuery("select MODEL_NAME from MODEL_INFO")

    for idx in range(len(model_name)):
        headers = {
            "Referer" : "http://search.danawa.com/dsearch.php?query="+str(model_name[idx][0].encode()),
            "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"
        }

        data = {
            "query" : model_name[idx][0]
        }

        res = requests.post("http://search.danawa.com/ajax/getProductList.ajax.php", headers=headers, data=data)
        soup = BeautifulSoup(res.text, "html.parser")
        standard = soup.select('ul.product_list > li.prod_item ')

        for num in range(len(standard)):
            name = standard[num].select('div.prod_main_info > div.prod_info > p.prod_name > a')[0].text
            category = standard[num].select('div.prod_main_info > div.prod_info > div.prod_sub_info > dl.prod_category_location > dd > a > span')[0].text

            if '스마트폰' in category:
                if '공기계' in name:
                    value = standard[num].select('div.prod_main_info > div.prod_pricelist > ul')[0].select(
                       'p.price_sect > a > strong')[0].text
                    break
                else:
                    continue
            else:
                value = standard[num].select('div.prod_main_info > div.prod_pricelist > ul')[0].select('p.price_sect > a > strong')[0].text
                break
        
        value = value.replace(',','')
        dbc.execQuery("UPDATE MODEL_INFO SET PRICE={} WHERE MODEL_NAME='{}'".format(int(value),model_name[idx][0]))

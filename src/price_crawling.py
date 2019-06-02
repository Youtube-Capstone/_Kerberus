import requests
from DBcontroller import DBcontroller
from bs4 import BeautifulSoup
import datetime

if __name__ == '__main__':
    dbc = DBcontroller()
    CRAWLED_DATE = datetime.datetime.today().strftime("%Y-%m-%d")

    model_name = dbc.execQuery("select MODEL_NAME from MODEL_INFO")

    for idx in range(len(model_name)):
        headers = {
            "Referer" : "http://search.danawa.com/dsearch.php?query="+str(model_name[idx][0].encode()),
            "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"
        }

        data = {
            "query" : model_name[idx][0]
        }
        check_name_value = 0
        check_cost_value = False
        res = requests.post("http://search.danawa.com/ajax/getProductList.ajax.php", headers=headers, data=data)
        soup = BeautifulSoup(res.text, "html.parser")
        products = soup.select('ul.product_list > li.prod_item ')

        for pidx in range(len(products)):
            name = products[pidx].select('div.prod_main_info > div.prod_info > p.prod_name > a')[0].text
            category = products[pidx].select('div.prod_main_info > div.prod_info > div.prod_sub_info > dl.prod_category_location > dd > a > span')[0].text
            check_value = pidx
            if '스마트폰' in category:
                if '공기계' in name:
                    break
                else:
                    continue
            else:
                break

        values = products[check_name_value].select('div.prod_main_info > div.prod_pricelist > ul > li')
        
        for vidx in range(len(values)):
            value = values[vidx].select('p.price_sect > a > strong')[0].text
            if '단종' in value or '품절' in value:     
               continue
            else:
               check_cost_value = True
               break
        
        if check_cost_value:
           cost = int(value.replace(',',''))
        else:
           cost = -1

        dbc.execQuery("INSERT INTO PRICE_INFO VALUES('{}',{},'{}')".format(model_name[idx][0],cost,CRAWLED_DATE))

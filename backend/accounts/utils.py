from rest_framework.views import exception_handler
import requests, json
from matterhook import Webhook

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.

    response = exception_handler(exc, context)
    # Now add the HTTP status code to the response.

    if response is not None:
        response.data['status_code'] = response.status_code
    else:
    # if response.data['status_code']//100 == 5:
        mwh = Webhook('https://meeting.ssafy.com', 'g5paiizrbjrt8n5xyswhj5jgpy')
        json_data = json.dumps(str(exc), ensure_ascii=False)
        mwh.send(json_data)

    return response
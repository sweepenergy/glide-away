FROM python:3.9.2-alpine3.13

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN python -m pip install -r requirements.txt

COPY . .

CMD [ "python", "main.py" ]
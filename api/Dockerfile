FROM derekadair/python-workflow:dev
COPY ./requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt

COPY ./ /code/
WORKDIR /code
RUN python manage.py collectstatic --no-input
EXPOSE 80
CMD python manage.py runserver 0.0.0.0:80

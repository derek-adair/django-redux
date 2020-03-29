FROM derekadair/python-workflow:dev
COPY ./ops/pip.conf /tmp
COPY ./ops/requirements.txt /tmp
ENV PIP_CONFIG_FILE=/tmp/pip.conf
RUN pip install -r /tmp/requirements.txt

COPY ./ /code/
WORKDIR /code
RUN python manage.py collectstatic --no-input
EXPOSE 80
CMD python manage.py runserver 0.0.0.0:80

# django-redux
Django Rest / React Redux all ready to go in docker

## Running Demo
* [UI](https://django-redux-ui.demo.derekadair.com/)
* [API](https://django-redux-api.demo.derekadair.com/)

## Easy Development Bootstrapping
1. Install [Docker](https://docs.docker.com/install/)
2. `git clone https://github.com/derek-adair/django-redux.git && cd django-redux`
3. Set up docker-compose .env files
    ```
    cp .env-api.example .env-api && cp .env-ui.example .env-ui
    ```
4. run migrations
   `docker-compose run --rm api python manage.py migrate`
5. Run containers
   `docker-compose up`
6. View containers:
   * UI - http://$DOCKER_HOST:3000/
   * API - http://$DOCKER_HOST:80/

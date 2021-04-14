# CONNECT - Django

## CONNECT webpages
- hosted by Heroku
- about-us https://connectuniverse.herokuapp.com/about_us/

## Important!
Please do **NOT** paste the secret key inside `settings.py`

Do the things below for the beginning

- run virtual environment outside the repository
- if you have no virtual environment go ***outside*** the repo and do `$ pip3 install virtualenv`
- run virtual environment `$ source bin/activate` (this works for linux and macos)
- pip install all required modules in `requirements.txt` `pip install -r requirements.txt`

## Run server
1. `$ export SECRET_KEY=[secret key]`, if you haven't add it to rc file
    - for TAs', you can use arbitrary key string
1. run virtual environment `$ source bin/activate`
2. move to src file
3. `$ python manage.py`

## Do anything relate to models
1. `$ python manage.py makemigrations`
2. `$ python manage.py migrate`

## Add admin account
- `$ python manage.py createsuperuser`

## Preprocessor related works
1. Pug preprocessor:  [Pypugjs](https://github.com/CamelotVG/pypugjs)
    - automaticall render pug templates
    - find them at `templates/`
2. Sass preprocessor: [django-sass-processor](https://github.com/jrief/django-sass-processor)
    - support for sass style files
    - find them at `static/sass/`
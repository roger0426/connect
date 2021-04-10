# CONNECT - Django

## Important!
Please do **NOT** paste the secret key inside `settings.py`

Do the things below for the beginning

- `$ export SECRET_KEY=[secret key]`
- run virtual environment outside the repository
- if you have no virtual environment go outside the repo and do `$ pip3 install virtualenv`
- run virtual environment `$ source bin/activate` (this works for linux and macos)
- pip install all required modules in `requirements.txt`

## Run server
1. run virtual environment
2. move to src file
3. `$ python manage.py`

## Do anything relate to models
1. `$ python manage.py makemigrations`
2. `$ python manage.py migrate`

## Add admin account
1. `$ python manage.py createsuperuser`
# CONNECT - Django

## Important!
Please do store the SECRET_KEY to local before doing any editing

NOTE: you have to do this step only one time

`export SECRET_KEY=[SECRET_KEY]`

make sure you have store successfully with `echo $SECRET_KEY`

SECRET_KEY has been already in google drive, check it there

## Run server
1. move to src file
2. `$ python manage.py`

## Do anything relate to models
1. `$ python manage.py makemigrations`
2. `$ python manage.py migrate`

## Add admin account
1. `$ python manage.py createsuperuser`
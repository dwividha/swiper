FROM tiangolo/uwsgi-nginx-flask:python3.7
COPY ./app /app
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# Set the application directory
# WORKDIR /featureEngineering

# Install our requirements.txt
# ADD requirements.txt /featureEngineering/requirements.txt


# Copy our code from the current folder to /app inside the container
# ADD . /featureEngineering

# RUN apt-get update
# RUN apt-get install -y nginx

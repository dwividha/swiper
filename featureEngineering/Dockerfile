FROM tiangolo/uwsgi-nginx-flask:python3.7
ENV LISTEN_PORT 8080
COPY ./app /app
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt
RUN mkdir /keys
RUN openssl req -x509 -newkey rsa:4096 -keyout /keys/key.pem -out /keys/cert.pem -days 365 -nodes -subj "/C=US/ST=Oregon/L=Portland/O=Company Name/OU=Org/CN=backend.tinerd.com"
# Set the application directory
# WORKDIR /featureEngineering

# Install our requirements.txt
# ADD requirements.txt /featureEngineering/requirements.txt


# Copy our code from the current folder to /app inside the container
# ADD . /featureEngineering

# RUN apt-get update
# RUN apt-get install -y nginx

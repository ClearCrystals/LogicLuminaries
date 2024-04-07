FROM gitlab/gitlab-runner

COPY requirements.txt /requirements.txt
RUN apt-get update && \
    # apt-get install -y pkg-config libmysqlclient-dev build-essential software-properties-common curl && \
    apt-get install -y software-properties-common curl && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.12-dev
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12
RUN pip install -r /requirements.txt

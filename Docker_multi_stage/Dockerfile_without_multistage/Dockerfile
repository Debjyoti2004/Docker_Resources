FROM ubuntu

WORKDIR /app

RUN apt-get update && apt-get install -y golang-go && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV GO111MODULE=off

COPY . .


RUN go build -o calculator .

ENTRYPOINT ["/app/calculator"] 

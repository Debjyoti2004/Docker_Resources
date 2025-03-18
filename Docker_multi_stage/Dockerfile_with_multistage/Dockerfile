#####################################
# Stage 1: Build the Go application
#####################################
FROM ubuntu as builder

WORKDIR /app

RUN apt-get update && apt-get install -y golang-go && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


copy . .

ENV GO111MODULE=off

RUN go build -o calculator

##########################################################
# Stage 2: Use MultiStage ther For reduce teh images size
##########################################################

FROM gcr.io/distroless/static


WORKDIR /app

COPY --from=builder /app/calculator /app/calculator

CMD ["/app/calculator"]

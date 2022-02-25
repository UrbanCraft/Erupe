FROM golang:1.16-alpine

RUN apk add --no-cache git

ENV GO111MODULE=on

WORKDIR /app/erupe

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

#RUN go build .

CMD [ "go", "run", "." ]
FROM openjdk:17-jdk-alpine


WORKDIR /app


COPY src/Main.java .


RUN javac Main.java

ENTRYPOINT ["java"]

CMD ["Main" ]

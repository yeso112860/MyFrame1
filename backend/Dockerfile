FROM bellsoft/liberica-openjdk-alpine:latest
LABEL authors="yasiravcibasi"
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

FROM eclipse-temurin:21-jdk-jammy
LABEL authors="BD2-team-06"

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set the working directory inside the container
WORKDIR /app

# Copy the necessary files for Maven
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
CMD ["mvn","spring-boot:run"]

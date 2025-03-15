FROM ubuntu:22.04


WORKDIR /app

RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y --no-install-recommends nodejs nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


COPY package*.json /app/
RUN npm install


COPY . .


RUN npm run build


RUN rm -rf /var/www/html/* && \
    cp -r /app/dist/* /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


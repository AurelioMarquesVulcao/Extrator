
FROM node:18
# ARG e=development
# ENV ENV_FILE=$e
# RUN 
WORKDIR /app
COPY . .
# ENV PORT 8080
# ENV H. .
ENV TZ=America/Recife

RUN ls -la
# RUN echo $ENV_FILE
# RUN echo $PORT
RUN ls
RUN yarn && yarn build 
# RUN yarn build:packages

RUN sed -i 's/DEFAULT\@SECLEVEL\=2/DEFAULT\@SECLEVEL\=1/' /etc/ssl/openssl.cnf

# RUN echo $ENV_FILE
CMD yarn serve:manga

EXPOSE 80
EXPOSE 8080
EXPOSE 3300

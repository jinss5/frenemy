# Dockerfile

FROM node:16-alpine

WORKDIR /usr/src/app

# 현재 패키지 설치 정보(package.json, package-lock.json)를 Docker 이미지에 복사합니다.
COPY package*.json .

RUN npm install

# 현재 경로에 존재하는 모든 파일을 Docker 이미지에 복사합니다.
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
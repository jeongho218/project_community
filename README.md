# Project Community

개발 중..

### 사용한 기술

- TypeScript
- NestJS
- MySQL
- TypeORM
- AWS RDS (DB Server)

## 사용 방법

### 패키지 설치

```
$ npm install
```

### .env 설정

```
PORT=/* Backend port number to use */
DB_HOST=/* DB address (localhost or AWS RDS) */
DB_USERNAME=/* DB admin name */
DB_PASSWORD=/* DB admin password */
DB_DATABASE=/* DB name to use */
COOKIE_SECRET=/* secret key */
```

### 어플리케이션 가동

```
$ npm run start:dev
```

### DB 생성 (Default: MySQL)

```
$ npm run db:create
```

### 테이블 생성

```
$ npm run schema:sync
```

### 이후 Swagger API 문서 참조

Swagger (배포 후 하이퍼링크가 들어갈 예정)

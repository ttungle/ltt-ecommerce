<div align="center">
<h1>LTT-Ecommerce</h1>

**A selling jewelry website**

</div>

## Table of Contents
 - [About the project](#about-the-project)
 - [Getting Started](#getting-started)
 - [Demo](#demo)
 - [Contributing](#contributing)

## About the project

![home-page](https://user-images.githubusercontent.com/59435436/235349500-d5310326-4dd4-4b06-85bb-0d11d20857c6.jpg)


### Built With
* [![Strapi][Strapi]][Strapi-url]
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Redux][Redux]][Redux-url]
* [![React-Query][React-Query]][Redux-url]
* [![MUI][MUI]][MUI-url]
* [![React-Hook-Form][React-Hook-Form]][React-Hook-Form-url]
* [![Docker][Docker]][Docker-url]

### Features
1. Home page with slides, category, products, video and articles.
2. Shop products list with: hero, sort, filter, pagination, layout functions.
3. Product details with: product info, add to cart, details info, suggestion and reviews.
4. Cart page with: product summary list and total.
5. Checkout page with: checkout form, receive order & pay by cash, card payment with Stripe.
6. Blog list page with: filter by category and pagination.
7. Blog details page.
8. About us page.
9. Contact page with map.
10. Register/login user.
11. User Profile with: personal infomation, avatar, change password and delete account.
12. Strapi admin page with: manage contents, users, permission.

## Getting Started
### How to start
#### Install node_modules main folder:
```
yarn install
```
#### Install node_modules backend:
```
cd backend
yarn install
yarn build
```
#### Install node_modules frontend:
```
cd ../frontend
yarn install
```
#### Start project:
```
cd ..
yarn develop
```

### Configuring project
#### 1. Development ```.env``` file configuration:
Be sure to have the correct env variables
* backend/.env file:
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=...,...,...,...
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:3000
PUBLIC_STRAPI_URL=http://localhost:1337

```
* frontend/.env file:
```
NEXT_PUBLIC_API_URL=http://localhost:1337
```
#### 2. PostgreSQL configuration:
* Install PostgreSQL 14
* Install pgAdmin 4
* Make sure the username and password of the database connection in the backend source are correct.

### Build & Deployment
#### 1. Configure the ```.env``` file as below:
#### backend/.env file:
```
DATABASE_HOST=postgres
CLIENT_URL=https://yourdomain
PUBLIC_STRAPI_URL=https://yourdomain/strapi
```
#### frontend/.env file:
```
NEXT_PUBLIC_API_URL=https://yourdomain/strapi
```
#### .env file:
```
PORT=1337
APP_KEYS=...,...,...,...
API_TOKEN_SALT=<your-api-token-salt>
ADMIN_JWT_SECRET=<your-admin-jwt-secret>
JWT_SECRET=<your-jwt-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
CLIENT_URL=https://yourdomain
PUBLIC_STRAPI_URL=https://yourdomain/strapi

DATABASE_PORT=5432
DATABASE_NAME=ltt-ecommerce
DATABASE_USERNAME=<your-db-username>
DATABASE_PASSWORD=<your-db-password>
NODE_ENV=production

NEXT_PUBLIC_API_URL=https://yourdomain/strapi
```
#### 2. Creating folders in VPS as below structure:
````
application
|_certs
|_db-data
|_log
|  |_nginx
|_ltt-ecommerce
|_uploads
````
#### 3. Upload your source code to VPS:
By git clone or FileZilla.
#### 4. Install docker and docker compose in VPS
#### 5. Download SSL certs and install:
* Download certs contains 3 files:
````
certificate.crt
ca_bundle.crt
private.key
````
* Move/upload above certs file to ````certs```` folder in vps.
* Merge ````.crt```` with below command:
````
$ cat certificate.crt ca_bundle.crt >> certificate.crt
````
#### 6. Build and start images:
Make sure you are in ltt-ecommere folder containing ````docker-compose.yml```` file.
* Build images:
````
docker compose build
````
* Start images:
````
docker compose up -d
````
* ufw:
````
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
````
## Demo
### Home Page

![home-page](https://user-images.githubusercontent.com/59435436/235349777-fa417bd9-295e-481d-877d-92176779f6ea.gif)

### Shop page and others

![shop-page](https://user-images.githubusercontent.com/59435436/235351855-63c2892e-eef3-46c6-97f8-31d5111ba79b.gif)


## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- MARKDOWN LINKS & IMAGES -->
[Strapi]: https://img.shields.io/badge/strapi-2F2E8B?style=for-the-badge&logo=strapi&logoColor=white
[Strapi-url]: https://strapi.io/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux]: https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux-toolkit.js.org/
[React-Query]: https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white
[React-Query-url]:https://tanstack.com/query/latest
[MUI]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[React-Hook-Form]: https://img.shields.io/badge/react%20hook%20form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white
[React-Hook-Form-url]: https://react-hook-form.com/
[Docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

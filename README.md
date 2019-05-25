# rappiCodeHub

Is a project that attemps to simulate the first version of the actual best Colombian StartUp Rappi

## Installation

1. Clone this repository in your machine with this link: https://github.com/scarvajalc/rappiCodeHub.git
2. Backup in PostgreSQL/PgAdmin the file called RappiCodeHub_Final located in the main root directory of this project
3. Open the project with your loved IDE (If Visual Studio) write the next lines in the terminal

```javascript
npm install
```

## Usage

1. In the terminal write the next lines to run the app

```javascript
npm start || npm run dev
```

2. Enter to the desired role by:

- localhost:8080/clientIndex for Client
- localhost:8080/rappiTenderoIndex for RappiTendero
- localhost:8080/adminIndex for Administrator

## Important Notes

- The administrator email to login is: jsebastian@admin.com
- All RappiTenderos are created by the Administrator

There is an important order to create the Restaurant Chain - Stores and Products:

1. The admin must register a RestaurantChain
2. The admin must register a Store
3. The admin must register a Product
4. The admin must associated Products to a Store

## License

[MIT](https://choosealicense.com/licenses/mit/)

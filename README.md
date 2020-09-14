# JavStocks

## Description
This full stack web application allows the user to create a username and login with that username so that they can buy and sell dummy stocks using the real world current prices. Once username is created and logged in, the user starts with $10,000 in dummy credit which they can use to buy stocks and build their portfolio. 

When the app first loads, it connects to the IEX Cloud API using Axios. You can make a get request to the API by entering the desired stock's ticker symbol into the "Search for Stocks" form. Once the form is submitted, a ticker info component will appear which will have the stock's ticker info which includes the name of the company and the current price of the Stock.

In the ticker info component, you can enter the quantity of the stock you want to purchase and if you click the Buy button, the stock will added to your portfolio and your balance will be reduced by the cost of the stocks that were purchased.

If you leave the app and sign back in, your purchased stocks and updated balance will still be there.

## Technologies/Libraries Used:
* Node.js <https://nodejs.org/en/>
* React.js <https://facebook.github.io/react/>
* Axios <https://github.com/mzabriskie/axios/>
* Semantic-UI <https://github.com/Semantic-Org/Semantic-UI>
* PostgresQL <https://www.postgresql.org/>
* Sequelize <https://sequelize.org/>


## Instructions to run this application in your browser:

Open your browser and in the search bar enter the URL <https://javstocks.herokuapp.com/>

When the app first loads, you will see a login/register form in the middle of the page. As a new user, you will first create a username and password which you will use to log in to the application.
<img width="983" alt="Screen Shot 2020-09-14 at 12 28 42 AM" src="https://user-images.githubusercontent.com/55659287/93044606-4b8c5e00-f623-11ea-8ae5-22af3cc76bf5.png">

Once you log in with your username for the first time, you will be on the portfolio page where you will see your name, initial balance, and a search input form where you can search for stocks by entering the stock's ticker symbol.
<img width="1172" alt="Screen Shot 2020-09-14 at 12 31 55 AM" src="https://user-images.githubusercontent.com/55659287/93044609-4d562180-f623-11ea-96f0-cf6189114873.png">

Once you submit the form with stock's ticker symbol, a ticker info component will pop up which shows the company name and current price of the stock with an option to buy.
<img width="1177" alt="Screen Shot 2020-09-14 at 12 33 22 AM" src="https://user-images.githubusercontent.com/55659287/93044615-4f1fe500-f623-11ea-893c-d00d3e6b095c.png">

When you buy the stock with the quantity you entered into the ticker info component, the stock will be added to your portfolio.
<img width="1182" alt="Screen Shot 2020-09-14 at 12 33 53 AM" src="https://user-images.githubusercontent.com/55659287/93044627-50e9a880-f623-11ea-8499-70b712e40143.png">

You can buy more stocks and keep adding to your portfolio as long as you have enough credit in your balance.
<img width="1166" alt="Screen Shot 2020-09-14 at 12 34 37 AM" src="https://user-images.githubusercontent.com/55659287/93044641-534c0280-f623-11ea-945b-22826325e4a4.png">

A record of your transactions will be stored in the transactions tab.
<img width="1165" alt="Screen Shot 2020-09-14 at 12 35 08 AM" src="https://user-images.githubusercontent.com/55659287/93044644-55ae5c80-f623-11ea-9b75-f5431043eb10.png">

const { User, Stock } = require('/models');

// delete everything in the database

const main = async () => {
    await User.destroy({
        where: {}
    });

    await Stock.destroy({
        where: {}
    });


    await User.create({
        username: 'Javits Arias',
        email: 'javits@gmail.com',
        password: 'helloworld',
        balance: 10000
    });

    await Stock.create({
        companyName: 'Apple, Inc.',
        ticker: 'AAPL',
        qty: 3,
        userId: 1
    })

}

const run = async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);
    } finally {
        await process.exit();
    }
}

run();
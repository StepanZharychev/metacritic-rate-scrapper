const cheerio = require('cheerio');
const { getWithRetry } = require('../utils/request');

module.exports.scrapPage = async username => {
    let result = {
        totalReviews: 0,
        totalRatings: 0,
        reviews: []
    };
    const pageData = await getWithRetry(`https://www.metacritic.com/user/${username}?myscore-filter=Game&myreview-sort=date`);
    const pageQuery = cheerio.load(pageData);
    const reviews = pageQuery('.review_content').toArray();
    const totalScoresText = pageQuery('.user_totals .total_summary_ratings .data').text()

    for (let review of reviews) {
        const reviewQuery = cheerio.load(review);

        result.totalReviews++;
        result.totalRatings = +totalScoresText;
        result.reviews.push({
            game: reviewQuery('.review_product .product_title').text(),
            date: reviewQuery('.review_product .date').text()
        });
    }

    return result;
};

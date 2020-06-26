const cheerio = require('cheerio');
const { getWithRetry } = require('../utils/request');

module.exports.scrapPage = async (url, pageNumber) => {
    let entries = [];
    const pageData = await getWithRetry(`${url}/user-reviews?sort-by=date&num_items=100&page=${pageNumber - 1}`)
    const pageQuery = cheerio.load(pageData);
    const userReviews = pageQuery('.user_reviews .user_review .review_content').toArray();

    for (let userReview of userReviews) {
        const userReviewQuery = cheerio.load(userReview);

        entries.push({
            user: userReviewQuery('.review_stats .review_critic .name a').attr('href').split('/').pop(),
            date: userReviewQuery('.review_stats .review_critic .date').text(),
            grade: +userReviewQuery('.review_stats .review_grade').text(),
            text: userReviewQuery('.review_body .blurb_expanded').length ? userReviewQuery('.review_body .blurb_expanded').text() : userReviewQuery('.review_body > span').text(),
            approvalRate: (+userReviewQuery('.review_helpful .total_ups').text() || 0) / (+userReviewQuery('.review_section .total_thumbs').text() || 0) || 0
        });
    }

    return entries;
};

# Simple Metacritic scrapper
This set of scripts is designed to get basic info from Metaritic Games section, specifically from User Reviews.
In order to make it work follow the instructions below:

`npm i` from the root of repository

(1) **Index pages.** From root of the folder run the following:
```bash
node indexPages.js <gameurl> <pagenumber>
```
- **gameurl** - here is taken from game URL, e.g. for `https://www.metacritic.com/game/playstation-4/the-last-of-us-part-ii/user-reviews?sort-by=date&num_items=100&page=272` it's going to be everything up to `user-reviews`;
- **pagenumber**(optional) - is a page number where indexing is going to be started;

So a call for the parameters above will look like:
```bash
node indexPages.js https://www.metacritic.com/game/playstation-4/the-last-of-us-part-ii 1
```

(2) Index Users. Each review has user, next step gets user's data:
```bash
node indexUsers.js <gamename>
```
- **gamename** - here is taken from game URL, e.g. for `https://www.metacritic.com/game/playstation-4/the-last-of-us-part-ii/user-reviews?sort-by=date&num_items=100&page=272` it's going to be `the-last-of-us-part-ii`;

As a result of 2 steps you should have 2 directories in the following path `results/the-last-of-us-part-ii` they're `pages` and `users`.
Last step will unify them into 1 big file:

(3) Unify results.
```bash
node unifyResults.js <gamename>
```
- **gamename** - the same as above

You can find your JSON with unified data in `totals` folder.

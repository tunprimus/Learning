/* Using chapter examples to understand functional programming and refactoring
*/

/* IMPERATIVE PROGRAMMING
N.B.: The state of a programme is the value of its global variables at a given time.
Any assignment to one of these variables is a state change, often called a mutation.
Use const to declare variables to limit mutation.
*/

const movieList = [
    {
    title: "Batman",
    year: 1989,
    director: "Tim Burton",
    imdbRating: 7.6
    },
    {
    title: "Batman Returns",
    year: 1992,
    director: "Tim Burton",
    imdbRating: 7.0
    },
    {
    title: "Batman Forever",
    year: 1995,
    director: "Joel Schumacher",
    imdbRating: 5.4
    },
    {
    title: "Batman & Robin",
    year: 1997,
    director: "Joel Schumacher",
    imdbRating: 3.7
    },
    {
    title: "Batman Begins",
    year: 2005,
    director: "Christopher Nolan",
    imdbRating: 8.3
    },
    {
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    imdbRating: 9.0
    },
    {
    title: "The Dark Knight Rises",
    year: 2012,
    director: "Christopher Nolan",
    imdbRating: 8.5
    }
];

/* 
// Get movie titles
const titles = [];
for (const movie of movieList) {
    titles.push(movie.title);
}
console.log(titles);
console.log("\n======+=====\n");

// Count movies by Christopher Nolan
const nolanMovieList = [];
for (const movie of movieList) {
    if (movie.director === "Christopher Nolan") {
        nolanMovieList.push(movie);
    }
}
console.log(nolanMovieList);
console.log("\n======+=====\n");

// Get titles of movies with an IMDB rating greater or equal to 7.5
const bestTitles = [];
for (const movie of movieList) {
    if (movie.imdbRating >= 7.5) {
        bestTitles.push(movie.title);
    }
}
console.log(bestTitles);
console.log("\n======+=====\n");

// Compute average movie rating of Christopher Nolan's movies
let ratingSum = 0;
let averageRating = 0;
for (const movie of nolanMovieList) {
    ratingSum += movie.imdbRating;
}
averageRating = ratingSum / (nolanMovieList.length);
console.log(averageRating);
console.log("\n======+=====\n");

 */

/* PROCEDURAL PROGRAMMING
Use source code subdivision int functions and transform as many variables as possible into local variables.
*/

/* 
// Get movie titles
const titles = () => {
    const titles = [];
    for (const movie of movieList) {
        titles.push(movie.title);
    }
    return titles;
};

const nolanMovieList = [];

// Get movies by Christopher Nolan
const nolanMovies = () => {
    for (const movie of movieList) {
        if (movie.director === "Christopher Nolan") {
            nolanMovieList.push(movie);
        }
    }
};

// Get titles of movies with an IMDB rating greater or equal to 7.5
const bestTitles = () => {
    const bestTitles = [];
    for (const movie of movieList) {
        if (movie.imdbRating >= 7.5) {
            bestTitles.push(movie.title);
        }
    }
    return bestTitles;
};

// Compute average rating of Christopher Nolan's movies
const averageNolanRating = () => {
    let ratingSum = 0;
    for (const movie of nolanMovieList) {
        ratingSum += movie.imdbRating;
    }
    return ratingSum / (nolanMovieList.length);
};

console.log(titles());
nolanMovies();
console.log(nolanMovieList.length);
console.log(bestTitles());
console.log(averageNolanRating());
 */

/* PURE FUNCTIONS
Pure function has outputs only dependent on inputs and no side effect (change in programme state of interaction with the outside wall [e.g. database access or use of console.log])
*/

/* 
// Get movie titles
const titles = movies => {
    const titles = [];
    for (const movie of movies) {
        titles.push(movie.title);
    }
    return titles;
};

// Get movies by Christopher Nolan
const nolanMovies = movies => {
    const nolanMovies = [];
    for (const movie of movies) {
        if (movie.director === "Christopher Nolan") {
            nolanMovies.push(movie);
        }
    }
    return nolanMovies;
};

// Get titles of movies with an IMDB rating greater or equal to 7.5
const bestTitles = movies => {
    const bestTitles = [];
    for (const movie of movies) {
        if (movie.imdbRating >= 7.5) {
            bestTitles.push(movie.title);
        }
    }
    return bestTitles;
};

// Compute average rating of a movie list
const averageRating = movies => {
    let ratingSum = 0;
    for (const movie of movies) {
        ratingSum += movie.imdbRating;
    }
    return ratingSum / (movies.length);
};

console.log(titles(movieList));
const nolanMovieList = nolanMovies(movieList);
console.log(nolanMovieList.length);
console.log(bestTitles(movieList));
console.log(averageRating(nolanMovieList));

 */

const numbers = [1, 5, 10, 15];
const doubles = numbers.map(x => x * 2);

console.log(numbers); // [1, 5, 10, 15] (no change)
console.log(doubles); // [2, 10, 20, 30]

/*
const titles = movies => {
    return movies.map(movie => movie.title);
};
console.log(titles());

const numbers2 = [1, 5, 10, 15];
const bigOnes = numbers2.filter(x => x >= 10);
console.log(numbers2); // [1, 5, 10, 15] (no change)
console.log(bigOnes); // [10, 15]

const nolanMovies = movies => {
    return movies.filter(movie => movie.director === "Christopher Nolan");
};
console.log(nolanMovies());

const bestTitles = movies => {
    return movies.filter(movie => movie.imdbRating >= 7.5).map(movie => movie.title);
};
console.log(bestTitles());

const numbers3 = [1, 5, 10, 15];
const sum = numbers3.reduce((acc, value) => acc + value, 0);
console.log(numbers3); // [1, 5, 10, 15] (no change)
console.log(sum); // 31

const averageRating = movies => {
    const ratingSum = movies.reduce((acc, movie) => acc + movie.imdbRating, 0);
    return ratingSum / movies.length;
};

const ratingSum = movies.map(movie => movie.imdbRating).reduce((acc, value) => acc + value, 0);
*/

const titles = movies => movies.map(movie => movie.title);
const byNolan = movie => movie.director === "Christopher Nolan";
const filter = (movies, func) => movies.filter(func);
const goodRating = movie => movie.imdbRating >= 7.5;
const ratings = movies => movies.map(movie => movie.imdbRating);
const average = array => array.reduce((sum, value) => sum + value, 0) / array.length;

console.log(titles(movieList));
const nolanMovieList = filter(movieList, byNolan);
console.log(nolanMovieList.length);
console.log(titles(filter(movieList, goodRating)));
console.log(average(ratings(nolanMovieList)));

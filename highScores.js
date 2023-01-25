//////////////CLASS DEFINITIONS/////////////////
class scoreEntry {
	constructor(name, score, dateTime) {
		this.name = name;
		this.score = score;
		this.dateTime = dateTime;
	}
}
class highScoresList {
	/**
	 * 
	 * @param {Array<scoreEntry>} scores 
	 */
	constructor(scores) {
		this.scores = scores;
		this.scores.sort((score1, score2) => score2.score - score1.score);
		this.renderScores();
	}

	/**
	 * 
	 * @param {Number} score 
	 * @returns {boolean}
	 */
	isTop10Score(score) {
		return this.scores.length < 10 || score > this.scores[9].score;
}
	/**
	 * 
	 * @param {scoreEntry} score 
	 */
	addScore(score) {
		//update the hiScores in the DOM first
		this.scores.push(score)
		//make sure our array of scores is sorted
		this.scores.sort((a,b) => b.score - a.score);

        this.renderScores();

		//update the server. Note if this fails, nobody really cares bc it's a demo project
		postJSON(highScoresURL, score);
	}

    renderScores() {
        const scoresList = document.querySelector('#high-scores-list');
        scoresList.innerHTML = "";
        this.scores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `${score.score}     ${score.name}      ${score.dateTime}`;
            scoresList.append(li);
            //assumes scores are stored in descending order
        });
    }
}
/////////////////////////////////////////


//wire up all parts of high scores div
const modal = document.querySelector('#high-scores-modal');
const span = document.querySelector('.close');
const form = document.querySelector('#new-score-form');
const highScoresButton = document.querySelector('.btn');

highScoresButton.addEventListener('click', e => {
	const highScoresList = document.querySelector('#high-scores-list');
	if(highScoresList.classList.contains('hidden')) {
		highScoresList.classList.remove('hidden');
		e.target.textContent = 'Hide High Scores';
	}
	else {
		e.target.textContent = "Show High Scores";
		highScoresList.classList.add("hidden");
	}
})

span.addEventListener('click', function() {
	modal.style.display = "none";
});

form.addEventListener('submit', e => {
	e.preventDefault();
	const modal = document.querySelector('#high-scores-modal');
	modal.style.display = "block";

	let now = new Date();
	let dateTime = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
	scoreList.addScore(new scoreEntry(e.target.name.value, sum, dateTime));
	e.target.reset();
	modal.style.display = "none";
});

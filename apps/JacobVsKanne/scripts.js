const players = {
    Kanne: "kanneworff",
    Jacob: "jacobh98"
};

let Games = [];

let wins = {
    Kanne: 0,
    Jacob: 0
}

const PopulateData = (player) => {
    fetch(`https://api.chess.com/pub/player/${player}/games/archives`)
    .then(response => response.json())
    .then(archiveData => {
        archiveData.archives.forEach(archive => {
            fetch(archive)
            .then(response => response.json())
            .then(gameData => {
                gameData.games.forEach(game => {
                    let kanneIsWhiteJacobIsBlack = game.white.username.toLowerCase() == players.Kanne && game.black.username.toLowerCase() == players.Jacob
                    let jacobIsWhiteKanneIsBlack = game.white.username.toLowerCase() == players.Jacob && game.black.username.toLowerCase() == players.Kanne
                    if(kanneIsWhiteJacobIsBlack || jacobIsWhiteKanneIsBlack) {
                        if(kanneIsWhiteJacobIsBlack) {
                            if(game.white.result == 'win') {
                                wins.Kanne += 1;
                            } 
                            DrawMatch({
                                url: game.url,
                                time: game.end_time,
                                kanneColor: 'white',
                                jacobColor: 'black',
                                kanne: game.white,
                                jacob: game.black
                            });
                        } else {
                            if(game.white.result == 'win') {
                                wins.Jacob += 1;
                            } ;
                            DrawMatch({
                                url: game.url,
                                time: game.end_time,
                                kanneColor: 'black',
                                jacobColor: 'white',
                                kanne: game.black,
                                jacob: game.white
                            });
                        }
                    }
                });
            });
        });
    });
}
PopulateData(players.Kanne);

const DrawMatch = (game) => {
    let elem = `
    <div class="row game">
        <div class="col col-4">
            <div class="row name-row">
                <div class="col col-8 ${game.kanne.result}">
                    <h2>Kanne</h2>
                </div>
                <div class="col col-2 rating">
                    ${game.kanne.rating}
                </div>
                <div class="col-2 color-col">
                    <div class="square square-${game.kanneColor}"></div>
                </div>
            </div>
        </div>
        <div class="col col-4">
            <div class="row">
                <div class="col">
                    <h2 style="text-align: right;">${wins.Kanne}</h2>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col text-center">
                            <a href="${game.url}" target="_blank">Link</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-center">
                            ${new Date(game.time * 1000).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <h2>${wins.Jacob}</h2>
                </div>
            </div>
        </div>
        <div class="col col-4">
            <div class="row name-row">
                <div class="col-2 color-col">
                    <div class="square square-${game.jacobColor}"></div>
                </div>
                <div class="col col-2 rating">
                    ${game.jacob.rating}
                </div>
                <div class="col col-8 ${game.jacob.result}">
                    <h2>Jacob</h2>
                </div>
            </div>
        </div>
    </div>
    `;
    $('#history').prepend(elem);
}


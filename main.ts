import { readFileSync } from 'fs';
interface SubGameData {
    red: number,
    green: number,
    blue: number
}
interface GameData {
    id: number,
    totalRed: number,
    totalBlue: number,
    totalGreen: number,
    games: SubGameData[]
}
const defaultGame: GameData = {
    id: 0,
    totalRed: 0,
    totalBlue: 0,
    totalGreen: 0,
    games: []
}

const numRegEx = /\d*/

const inputData: string[] = readFileSync('./input.txt', { encoding: "utf-8" }).split('\n')

let games: GameData[] = []

const conditions = {
    red: 12,
    green: 13,
    blue: 14
}

const processGames = () => {
    for (let game of inputData) {
        let g: GameData = {
            id: 0,
            totalRed: 0,
            totalBlue: 0,
            totalGreen: 0,
            games: []
        }
        const id: number = Number(game.split(':')[0].trim().replace("Game ", ''))

        g.id = id;

        let subGames: string[] = game.split(':')[1].split(';')
        for (let s of subGames) {
            s = s.replace(/\W/g, '')
            
            let subGame: SubGameData = {
                red: 0,
                green: 0,
                blue: 0
            }
            let greens = /(\d*green)/.exec(s)
            let blues = /(\d*blue)/.exec(s)
            let reds = /(\d*red)/.exec(s)
            
            if (greens)
                subGame.green = Number(numRegEx.exec(greens[0]))
            if (blues)
                subGame.blue = Number(numRegEx.exec(blues[0]))
            if (reds)
                subGame.red = Number(numRegEx.exec(reds[0]))

            g.totalRed = subGame.red > g.totalRed ? subGame.red : g.totalRed
            g.totalGreen = subGame.green > g.totalGreen ? subGame.green : g.totalGreen
            g.totalBlue = subGame.blue > g.totalBlue ? subGame.blue : g.totalBlue

            g.games.push(subGame)
        }
        games.push(g)
    }
    
}

const possibleGames = () => {
    let sum = 0;
    for (let game of games) {
        // const gamesPlayed:number = game.games.length
        // if(game.totalBlue / gamesPlayed > conditions.blue || game.totalGreen / gamesPlayed > conditions.green || game.totalRed / gamesPlayed > conditions.red)
        //     continue
        // sum = sum + game.id
        sum += (game.totalRed * game.totalBlue * game.totalGreen)
        // let possible:boolean = false
        // for(let s of game.games)
        // {
        //     if(s.red > conditions.red || s.blue > conditions.blue || s.green > conditions.green)
        //     {
        //         possible=false;
        //         break;
        //     }
        //     possible = true
        // }

        // if(possible)
        // {
        //     console.log(game.id)
        //     sum = sum + game.id
        // }
    }
    return sum
}
const sumOfPowers = ()=>{

}
processGames()
console.log(`Game Sums: ${possibleGames()}`)
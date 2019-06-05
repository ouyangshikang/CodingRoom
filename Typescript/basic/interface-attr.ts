interface Isquare {
    color: string;
    area: number
};

interface IsquareConfig {
    color?: string;
    width?: number
};

function createSquare(config: IsquareConfig): Isquare {
    let newSquare = {
        color: 'red',
        area: 100
    };

    if(config.color) {
        newSquare.color = config.color;
    }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let newSquare = createSquare({color: '#f02393', width: 20});
console.log(newSquare);

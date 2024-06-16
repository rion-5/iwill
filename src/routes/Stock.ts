// Stock.ts

class Stock {
    name: string;
    series: Series[];

    constructor(name: string, series: Series[]) {
        this.name = name;
        this.series = series;
    }  
}

class Series {
    name: string;
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

export { Stock, Series };
interface IsearchFunc {
    (source: string, substring: string): boolean
};

let mySearch: IsearchFunc;
mySearch = function(source, substring): boolean {
    let result = source.search(substring);
    return result > -1;
};

mySearch('adadaqwe', '/ad/');

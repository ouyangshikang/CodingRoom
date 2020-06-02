interface Ilabel {
    size: number;
    name: string
}
function printLabel(label: Ilabel) {
    console.log(label.name);
}

let label = {
    size: 10,
    name: 'label name'
};

printLabel(label);

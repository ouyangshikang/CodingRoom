import { observe } from './observe.js';

const data = {
    a: 1,
    b: 'adasd',
    c: true,
    d: {
        e: 2,
        f: 'warn',
    },
};

observe(data);

data.d.e = 4;

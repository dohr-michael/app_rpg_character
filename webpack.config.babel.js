import test  from './webpack/test';
import start from './webpack/start';
import build from './webpack/build';


const target = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : 'start';

const configs = {
    test:  test,
    build: build,
    start:   start
};

export default configs[target];
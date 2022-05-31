import EnvironmentInterface from './environment-interface';


export const environment: EnvironmentInterface = {
    production: true,
    serverUrl: 'http://localhost:5000',
    delayBetweenRequestsToCrb: 20 * 1000
};

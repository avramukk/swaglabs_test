export const BASE_URL = 'https://www.saucedemo.com/';

export const USERS: { [key: string]: { username: string; password: string } } = {
    STANDARD: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    LOCKED: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    PROBLEM: {
        username: 'problem_user',
        password: 'secret_sauce'
    },
    VISUAL: {
        username: 'visual_user',
        password: 'secret_sauce'
    }
};

export const SORTING_OPTIONS = {
    az: 'Name (A to Z)',
    za: 'Name (Z to A)',
    lohi: 'Price (low to high)',
    hilo: 'Price (high to low)'
}

export const LOGIN_ERROR_MESSAGES = {
    withoutUsername: 'Epic sadface: Username is required',
    withoutPassword: 'Epic sadface: Password is required',
    wrongCredentials: 'Epic sadface: Username and password do not match any user in this service',
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.'
}
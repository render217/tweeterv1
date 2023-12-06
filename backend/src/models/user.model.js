const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    bio: {
        type: String,
        default: '',
    },
    coverImage: {
        type: String,
        default:
            'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    profileImage: {
        type: String,
        default: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAANlBMVEWVu9////+QuN6Mtt3v9Prl7fbe6fSbv+H0+Pv7/P6qyOW0zujp8PjK3O6vy+bT4vGiw+PB1uyU6Zx1AAADo0lEQVRoge2b6W6sMAyFgxMIAUKS93/ZSzpbFwZ8GHtGV+L7UVVqpWOMcbyAMScnJycoRGQvLL+9Xdz6saRucs5NXSqjt280gShHF5rvBBfzm7xANLfNGtP8Dgsor6tX2qxugI1P1SvRKus/v/irCz4rr2sA7csvBqjFgE0M+aZJSjFAM0u+aWYdD1DP1O9V9Kkw5ZumqBjg2PpOQZ1GtnzTjPIOsB2g38k/Ap4bfZXei+tzH74Ls7Q8bZ87v4nSAQDdfoUAsMjtXwJAXB+SbxrxBwDUl5b3oL70A5hB/XzqywLqS8sTqC+e/0B98fzDrz4qTlz/w/n/0+cfVH5pFGBD2Fe9EwZpeWOg+kte3k6A/iRff0IBKB5+CwOgr3D7kQJcofyGMlCn0f8BGUCh/apwM0BQUTfEG380TVKawHBrIPHa5wozBSkknyu8HlS897zDcoDe5fNyoEbuu7Ez/a0oT4D37sCkqr7fB2pk/u/sZGGlzPsNu2XAqD3+N5tjYKXB70P68jOvB+F03b5oGUFUrtFF8e9RGG41ly8qayhrFlF3c4EpP6uhvtz/4hZTjGwckKX5Uv30tw0X2Rw714cQetfFfFs/Ur7Y1c0ktpG0fkiPq33E2OJmXzEPf3+LzT4NXsALRDn9bH3T0wAj87NCcenlnahd2XX246pryY5/K+R2fsUH5NcXXqGYXyaQNWW9PGz9YRfQ/LTiDF3J5mvzXrfwJpfu+b8ezUq03fKGunmPMdYt/PY/DgcNwEbOzznWDYMTly2OTGMI6Tf3OHAHWLteLgd2wujAdRu4JWHumrnAO2mPzRv3cGhdiK3b9gGbInDcuA84EQLHvfuAA2GPTBs5BCgAwGkrB6gzEL/9YAAI5v4b0BkAbls5QBtZdNvCAdGXTf4XgCMAeNWFD/BSDHvShwBMBUk+/LGhsHT2rSAvBUln3wowFUaX/TzYJ4Bo6fmAXYSqPH7AA6hw+lTYJ5Bw7XmDXYMqnH4V9gko2no84DchyKqTD380rJH+gAQo3Hvc9bkJCHrVkA97K/rp6/90/CtU/xV+B6BiANKAkImyOWCK4FiezO+563FcykeWApaG+LoJLg50eAZbP/N5wQ0uvf5hUJ2vjrFDU1LfxbHOZ18Tv9tAxs+x3Z6zXgmujbM34h9lLY4weRhT2/frZoS+b9M4ZCN12U+ssLSYUUpMXfv1/VfbpVjKIkxiDmeYcf/67foF3Ns/gTs5Ofnf+QflzijOuSLeBAAAAABJRU5ErkJggg==`,
    },
    coverImagePublicId: {
        type: String,
        default: null,
    },
    profileImagePublicId: {
        type: String,
        default: null,
    },
    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    ],
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

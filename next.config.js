const withImages = require('next-images')
module.exports = withImages({
    webpack(config, options) {
        return config
    },
    env: {
        openApiKey: '5b3caca166281e0c9ed2d2c66979cca2',
        apiUrl: 'http://api.openweathermap.org/data/2.5/group',
        foreCastApi: 'http://api.openweathermap.org/data/2.5/forecast',
        units: 'metric',
        iconPath: 'http://openweathermap.org/img/w/',
        cities: ['724627', '3060972', '724048', '865084','724144', '723554']
    }
})
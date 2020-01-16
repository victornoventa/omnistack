const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    list: async (request, response) => {
        const devs = await Dev.find();
        return response.json(devs);
    },
    store: async (request, response) => {
        const { github_username, techs, latitude, longitude } = request.body;

        const foundDev = await Dev.findOne({ github_username });
        if (foundDev) {
            return response.json(foundDev);
        }

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name, login, avatar_url, bio } = apiResponse.data;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        const techsArray = parseStringAsArray(techs);

        const dev = await Dev.create({
            github_username,
            name: name ? name : login,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        return response.json(dev);
    }
};
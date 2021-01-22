const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                API_REST_URL: JSON.stringify(process.env.API_REST_URL)
            }
        })
    ]
}
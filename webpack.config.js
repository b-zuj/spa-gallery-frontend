const { merge } = require('webpack-merge'); //[1]

const commonConfig = require('./config/webpack.common'); //[2]

module.exports = (env) => {
  const environment = env.prod ? 'prod.js' : 'dev.js'; 
  console.log(environment);
    const config = require('./config/webpack.' + environment); //[3]
    return merge(commonConfig, config); //[4]
};


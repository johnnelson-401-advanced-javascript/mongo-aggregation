const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const matchTicker = {
  $match: {
    ticker: 'abcd'
  }
};

const projectSharesByTime = {
  $project: {
    shares: '$shares',
    hour: {
      'hour': '$time'
    }
  }
};

const sortByTop = {
  $sort: {
    shares: -1
  }
};

const sortBottom = {
  $sort: {
    shares: 1
  }
};

const limitTen = {
  $limit: 10
};

schema.static('topTrades', function() {
  const pipelineTop = [
    matchTicker,
    projectSharesByTime,
    sortByTop,
    limitTen
  ];
  return this.aggregate(pipelineTop);
});

schema.static('bottomTrades', function() {
  const pipelineBotton = [
    matchTicker,
    projectSharesByTime,
    sortBottom,
    limitTen
  ];
  return this.aggregate(pipelineBotton);
});

module.exports = mongoose.model('Trades', schema);

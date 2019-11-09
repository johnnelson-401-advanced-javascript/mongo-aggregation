const mongoose = require('mongoose');
const { schema } = mongoose;

const sortZipByPop = {
  $sort: {
    pop: -1
  }
};
const limit = {
  $limit: 10
};

const projectZip = {
  $project: {
    state: '$state',
    pop: '$pop'
  }
};

schema.static('topTen', function() {
  const pipeline = [
    sortZipByPop,
    projectZip,
    limit
  ];
  return this.aggregate(pipeline);
});

module.exports = mongoose.model('zips', schema);


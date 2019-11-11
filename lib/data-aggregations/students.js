const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const unwindStudents = {
  $unwind: {
    path: '$scores'
  }
};

const matchNull = {
  $match: {
    'scores.score': {
      $ne: null
    }
  }
};

const groupByScores = {
  $group: {
    _id: '$scores.type',
    min: {
      $min: 'scores.score'
    },
    avg: {
      $avg: 'scores.score'
    },
    max: {
      $max: 'scores.score'
    }
  }
};

schema.static('student-scores', function() {
  const pipleine = [
    unwindStudents,
    matchNull,
    groupByScores
  ];
  return this.aggregate(pipleine);
});

module.exports = mongoose.model('Students', schema);
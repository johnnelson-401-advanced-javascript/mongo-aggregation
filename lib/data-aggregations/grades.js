const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const unwindGrades = {
  $unwind: {
    path: '$scores'
  }
};

const matchGradesNull = {
  $match: {
    'scores.score': {
      $ne: null
    }
  }
};
const groupGradesByScores = {
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

schema.static('grades-scores', function() {
  const pipeline = [
    unwindGrades,
    matchGradesNull,
    groupGradesByScores
  ];
  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Grades', schema);

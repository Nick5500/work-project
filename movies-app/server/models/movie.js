import { DataTypes } from 'sequelize';

import db from '../db/index.js';

const Movie = db.define('movie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT
  }
}, {
  timestamps: false
})

export default Movie;

const { DataTypes, db } = require('../Utils/util.database');

const Reviews = db.define('reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:'active',
}
});

module.exports = { Reviews };

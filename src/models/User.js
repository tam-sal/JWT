const { DataTypes } = require('sequelize')

const User = (database) => {
  database.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  )
}

module.exports = User
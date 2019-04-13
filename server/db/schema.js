/*
 * db/schema.js
 *
 * Tables used in authorization.
 *
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('cindy', 'cindy', 'cindy', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const User = sequelize.define(
  'sui_hei_user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    isSuperuser: {
      type: Sequelize.BOOLEAN,
      field: 'is_superuser',
      defaultValue: false,
      allowNull: false,
    },
    isStaff: {
      type: Sequelize.BOOLEAN,
      field: 'is_staff',
      defaultValue: false,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      field: 'is_active',
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'date_joined',
    updatedAt: false,
    freezeTableName: true,
  },
);

const AuthGroup = sequelize.define(
  'auth_group',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(80),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

User.belongsToMany(AuthGroup, {
  through: 'sui_hei_user_groups',
  timestamps: false,
  foreignKey: 'user_id',
  otherKey: 'group_id',
});

module.exports = { User, AuthGroup };

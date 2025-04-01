import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Verification extends Model {}

Verification.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Assumes a User model/table exists
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  verification_code: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Verification',
  tableName: 'Verifications',
  timestamps: false,
});

export default Verification;

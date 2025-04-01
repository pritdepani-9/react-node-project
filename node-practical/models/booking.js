import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Booking extends Model {}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Assumes a User model/table exists
        key: "id",
      },
      onDelete: "CASCADE",
    },
    customer_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    customer_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    booking_type: {
      type: DataTypes.ENUM("Full Day", "Half Day", "Custom"),
      allowNull: false,
    },
    booking_slot: {
      type: DataTypes.ENUM("First Half", "Second Half"),
      allowNull: true,
    },
    booking_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "Bookings",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["booking_date", "booking_type", "booking_slot", "booking_time"],
      },
    ],
  }
);

export default Booking;

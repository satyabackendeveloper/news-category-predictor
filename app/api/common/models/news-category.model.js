"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NewsCategory extends Model {
        static associate(models) {
            // Associations should be added here
        }
    }
    NewsCategory.init(
        {
            heading: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            createdAt: {
                field: "created_at",
                type: DataTypes.DATE,
            },
            updatedAt: {
                field: "updated_at",
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: "news_categories",
            timestamps: true,
            underscored: true,
        }
    );
    return NewsCategory;
};

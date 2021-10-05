module.exports = (sequelize, DataTypes) => {

    const Print = sequelize.define("Print", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        document: {
            type: DataTypes.STRING,
            
        },
        date: {
            type: DataTypes.DATE,
        }

    }, {
        tableName: "print",
        timestamps: false
    });

    return Print;
}
module.exports = (sequelize, DataTypes) => {
    const RegexSim = sequelize.define('regex_sim',{
        networkName: { type: DataTypes.STRING(20) },
        arrayOfFirstPhoneNumber: {type: DataTypes.TEXT},
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        regex: { type: DataTypes.TEXT },
    },
    {
        timestamps: true, //(updatedAt, createdAt)
        paranoid: true, //ko xóa data, thêm vào deleteAt
        freezeTableName: false //ko nguyên tên table
    });

    return RegexSim;
}
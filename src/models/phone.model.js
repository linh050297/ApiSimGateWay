module.exports = (sequelize, DataTypes) => {
    const PhoneNumber = sequelize.define('phone_number',{
        phoneNumber: { type: DataTypes.STRING(15) },
        lastTimeCall: { type: DataTypes.DATE },
        isCall: { type: DataTypes.DOUBLE },
        note: { type: DataTypes.TEXT },
    },
    {
        timestamps: true, //(updatedAt, createdAt)
        paranoid: true, //ko xóa data, thêm vào deleteAt
        freezeTableName: false //ko nguyên tên table
    });

    return PhoneNumber;
}
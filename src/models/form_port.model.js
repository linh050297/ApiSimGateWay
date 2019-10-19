module.exports = (sequelize, DataTypes) => {
    const PortSim = sequelize.define('form_port',{
        formPortSim: { type: DataTypes.TEXT },
    },
    {
        timestamps: true, //(updatedAt, createdAt)
        paranoid: true, //ko xóa data, thêm vào deleteAt
        freezeTableName: false //ko nguyên tên table
    });

    return PortSim;
}
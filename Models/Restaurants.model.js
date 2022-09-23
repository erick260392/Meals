const {DataTypes,db} =require ('../Utils/util.database.js')

const Restautants = db.define ('restaurants',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false,

    },

    address:{
        type:DataTypes.STRING,
        allowNull:false,


    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,

    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'active',
    }

})

module.exports = {Restautants}
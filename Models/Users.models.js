const {DataTypes,db} = require('../Utils/util.database')

const Users = db.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
name:{
    type:DataTypes.STRING,
    allowNull:false,
},
email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,

},
password:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
},
status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:'active',
},
role:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:'normal',
}

})


module.exports ={Users}
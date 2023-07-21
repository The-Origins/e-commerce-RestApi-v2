const mongoose = require("mongoose")
const productSchema = require("../schemas/product")

//Schema for the users location(s) incase they save multiple
const locationSchema = new mongoose.Schema(
    {
        country:
        {
            type:String,
        },
        state:
        {
            type:String,
        },
        city:
        {
            type:String,
        }, 
        street:
        {
            type:String,
        },
        address:
        {
            type:String,
        }
    }
)

//Schema for each item in the users cart
//The createdAt property was getting changed at each modification so I made it immutable
const cartItemSchema = new mongoose.Schema(
    {
        product:productSchema,
        quantity:{
            type:Number,
            required:true,
            default:1
        },
        variant:String,
        total:Number,
        createdAt:{
            type:Date,
            default:Date.now(),
            immutable:true
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
)

//Schema for the user
const userSchema = new mongoose.Schema(
    {
        name:{
            type:{
                first:{
                    type:String,
                    required:true,
                    lowercase:true
                },
                last:{
                    type:String,
                    lowercase:true
                },
            }
        },
        email:{
            type:String,
            lowercase:true,
            unique:true
        },
        phone:{
            type:{
                code:{
                    type:String,
                    default:"+1"
                },
                number:{
                    type:Number,
                    reqired:true,
                    unique:true
                }
            }
        },
        addresses:{
            type:[locationSchema],
            default:[{}]
        },
        hash:String,
        salt:String,
        admin:{
            type:Boolean,
            default:false
        },
        active:{
            type:Boolean,
            default:true
        },
        verified:{
            type:Boolean,
            default:true
        },
        pfp:{
            type:String,
            default:"https://tchblg.de/wp-content/uploads/user-avatar.png"
        },
        cart:{
            items:[cartItemSchema],
            total:{
                type:Number,
                default:0
            }
        }
    },
    {
        timestamps:true
    }
)


userSchema.pre("save", function(next)
{
    //update cart item total and cart total before saving any changes
    let total = 0
    if(this.cart.items)
    {
        for(item in this.cart.items)
        {
            this.cart.items[item].total = this.cart.items[item].quantity * this.cart.items[item].product.unitPrice.amount
            this.cart.items[item].updatedAt = Date.now()
            total += this.cart.items[item].total
        }
    }
    this.cart.total = total
    //updated the updatedAt date on save
    this.updatedAt = Date.now()
    next()
})

module.exports = userSchema

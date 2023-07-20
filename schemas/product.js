const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    userName:String,
    userImage:String,
    review:String
},
{timestamps:true}
)

const propertySchema  = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            lowercase:true
        },
        value:{
            type:String,
            required:true,
            lowercase:true
        },
    }
)

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    unitPrice:{
        currency:{
            type:String,
            default:"$"
        },
        amount:{
            type:Number,
            default:0
        }
    },
    brand:{
        type:String,
        default:"generic",
        lowercase:true
    },
    categories:{
        type:[String],
        lowercase:true
    },
    variants:{
        type:[String],
        lowercase:true
    },
    stock:{
        type:Number,
        default:0
    },
    images:[String],
    description:{
        type:String,
        default:"Awesome product"
    },
    rating:{
        score:{
            type:Number,
            default:0
        },
        votes:{
            type:Number,
            default:0
        }
    },
    ratings:[Number],
    reviews:{
        type:[reviewSchema],
        default:[]
    },
    tags:{
        type:[String],
        lowercase:true
    },
    properties:
    {
        type:[propertySchema]
    }
}, {timestamps:true})

productSchema.pre("save", function(next)
{
    let total = 0.00
    if(this.ratings.length > 1)
    {
        for(let rating in this.ratings)
        {
            total += this.ratings[rating]
        }
    }
    this.rating.votes = this.ratings.length
    this.rating.score = total?total/this.ratings.length:this.ratings.length ? this.ratings[0]:0
    next()
})

productSchema.statics.findByName = async function(name) 
{
    let results = await this.find({name:new RegExp(name, 'i')}).sort({"rating.score":-1})
    return results
}

productSchema.statics.findByBrand = async function(brand)
{
    let brands = []
    let response = await this.find({}, {brand:1, _id:0})
    response.forEach((element) =>
        {
            if(!brands.includes(element.brand))
            {
                brands = [...brands, element.brand]
            }
        })

    let results = await this.find({brand:new RegExp(brand, 'i')})

    for(let b in brands)
    {
        if(brand.includes(brands[b]))
        {
            const update = await this.find({brand:brands[b]})
            update.forEach((element) =>
            {
                if(!JSON.stringify(results).includes(JSON.stringify(element)))
                {
                    results = [...results, element]
                }
            })
        }
    }
    return results
}

productSchema.statics.findByCategory = async function(category)
{
    let categories = []
    let response = await this.find({}, {categories:1, _id:0})
    response.forEach((element) =>
        {
            element.categories.forEach((category) =>
            {
                if(!categories.includes(category))
                {
                    categories = [...categories, category]
                }
            })
        })

    let results = await this.find({categories:new RegExp(category, 'i')})

    for(let cat in categories)
    {
        if(category.includes(categories[cat]))
        {
            const update = await this.find({categories:categories[cat]})
            update.forEach((element) =>
            {
                if(!JSON.stringify(results).includes(JSON.stringify(element)))
                {
                    results = [...results, element]
                }
            })
        }
    }
    return results
}


productSchema.statics.findBySearch = async function(search, maxPrice, minPrice, brand, properties) 
{
    let results = []

    const updateResults = (updateArr) =>
    {
        const output = updateArr.filter((element) =>
        {
            return !JSON.stringify(results).includes(JSON.stringify(element))
        })
        return output
    }

    results = [...updateResults( await this.findByName(search))]
    results = [...results, ...updateResults( await this.findByBrand(search))]
    results = [...results, ...updateResults( await this.findByCategory(search))]
    
    if(maxPrice&&minPrice)
    {
        results = results.filter((result) =>
        {
            return result.unitPrice.amount >= minPrice && result.unitPrice.amount <= maxPrice
        })
    }
    if(brand)
    {
        results = results.filter((result) =>
        {
            return result.brand === brand
        })
    }
    if(properties.length)
    {
        results = results.filter((result) =>
        {
            for(let property in properties)
            {
                for(let productProperty in result.properties)
                {
                    if(String(result.properties[productProperty].name) === String(properties[property].name))
                    {
                        if(String(result.properties[productProperty].value) === String(properties[property].value))
                        {
                            return true
                        }
                    }
                }
            }
        })
    }
    return results
}

module.exports = productSchema
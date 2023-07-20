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
    //updated the product rating based on the ratings array
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
    //searches for all products in the database that have the name passed in the args and also products who's name contains the name passed in the args
    let results = await this.find({name:new RegExp(name, 'i')}).sort({"rating.score":-1})
    return results
}

productSchema.statics.findByBrand = async function(brand)
{
    let brands = []
    //fetch all the brands from the database
    //mongodb also returns the _id property of the product which is not necessary in this array
    let response = await this.find({}, {brand:1, _id:0})
    response.forEach((element) =>
        {
            //check if the brands array already includes the brand
            if(!brands.includes(element.brand))
            {
                //if not add it to the brands array
                brands = [...brands, element.brand]
            }
        })
    //fetch all the products in the database that have the brand that was passed in the args 
    //or if the product brand includes any thing from the search -> "del" -> true even if the brand === "dell"  insead
    let results = await this.find({brand:new RegExp(brand, 'i')})

    for(let b in brands)
    {
        //check if the brand from the brand array contains the brand passed in the args e.g -> "dells".includes("dell") -> true
        //this is incase the user adds an unnecessary 's' to their search as well as if they pass in a statement like "laptops by dell"
        if(brand.includes(brands[b]))
        {
            //run the search with that brand instead of the one the user inputed
            const update = await this.find({brand:brands[b]})
            update.forEach((element) =>
            {
                //check if the product already exists in the result array
                if(!JSON.stringify(results).includes(JSON.stringify(element)))
                {
                    //if not add it to the results array
                    results = [...results, element]
                }
            })
        }
    }
    return results
}

productSchema.statics.findByCategory = async function(category)
{
    //same logic as with the findByBrand function
    let categories = []
    //fetch all the product categories from the database
    let response = await this.find({}, {categories:1, _id:0})
    response.forEach((element) =>
        {
            //categories is an array so we need to loop through the array and check if the categories array already contains the category
            element.categories.forEach((category) =>
            {
                if(!categories.includes(category))
                {
                    //if not we add it to the categories array
                    categories = [...categories, category]
                }
            })
        })

    //find all the products in which the categories array contains the category passed in the args
    let results = await this.find({categories:new RegExp(category, 'i')})

    for(let cat in categories)
    {
        //check if the category passed in includes any of the product categories in the categories array "laptopsss".includes("laptop") -> true
        //this allows whoever is adding a product to the database not to have to consider all the edge cases of the users search
        if(category.includes(categories[cat]))
        {
            //Search for products using that category instead of the one the user passed in the args
            const update = await this.find({categories:categories[cat]})
            update.forEach((element) =>
            {
                //check if the results array already includes that product 
                if(!JSON.stringify(results).includes(JSON.stringify(element)))
                {
                    //if not add it to the results array
                    results = [...results, element]
                }
            })
        }
    }
    //return the results array
    return results
}


productSchema.statics.findBySearch = async function(search, maxPrice, minPrice, brand, properties) 
{
    //take the user search and add search for all the products that have that name, brand, or category
    //I know this is a very primitive and brute-force strategy for search but its the best i could come up with
    let results = []
    //checks if the products in the array passed in the args are not already in the results array
    const updateResults = (updateArr) =>
    {
        //filter out all the products that are already in the results array
        const output = updateArr.filter((element) =>
        {
            return !JSON.stringify(results).includes(JSON.stringify(element))
        })
        //return the filtered array
        return output
    }

    //add the results to the results arrray 
    //I do it using the updateResults function and in steps so that the function can check if the products already exist in the results array
    results = [...updateResults( await this.findByName(search))]
    results = [...results, ...updateResults( await this.findByBrand(search))]
    results = [...results, ...updateResults( await this.findByCategory(search))]

    //filters
    if(maxPrice&&minPrice)
    {
        //filters out all the products of which their unitprice.amount is less than the minPrice and more than the maxPrice passed in the args
        //ensure you pass in both a min price and a max price for this to work (min price can be zero)
        results = results.filter((result) =>
        {
            return result.unitPrice.amount >= minPrice && result.unitPrice.amount <= maxPrice
        })
    }
    
    if(brand)
    {
        //filters out all the products of which their brand !== to the brand passed in the args
        results = results.filter((result) =>
        {
            return result.brand === brand
        })
    }
    
    if(properties.length)
    {
        //product properties are attributes of the product e.g -> "color:black", "weight:1.0kgs", "cpu:i9-12900K". NOTE: properties are not the same as the description
        //this block filters out products of which their properties don't match the properties passed in the args
        //NOTE: properties is an array of objects with name and value fields-> [{name:"", value:""},{name:"", value:""}]
        results = results.filter((result) =>
        {
            //loop through the properties passed in the args
            for(let property in properties)
            {
                //loop through all the product properties
                for(let productProperty in result.properties)
                {
                    //if the product propety.name === passed in property.name then only send if back if their values are the same
                    //if the product does not have that property it will not be returned -> [{name:"cpu", value:"i9-12900K"}] if the product does not have a cpu property it wont be returned
                    //if you want to return the product if it doesn't have the property then uncomment the 'else' block below
                    if(String(result.properties[productProperty].name) === String(properties[property].name))
                    {
                        //if it does then only send it if the values are the same 
                        if(String(result.properties[productProperty].value) === String(properties[property].value))
                        {
                            return true
                        }
                    }
                    // else
                    // {
                    //     return true
                    // }    
                }
            }
        })
    }
    //return the results 
    return results
}

module.exports = productSchema

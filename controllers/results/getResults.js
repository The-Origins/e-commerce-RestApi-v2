const Product = require("../../config/database").models.Product

const getResults = async (req, res, next) =>
{
    //returns result based on search
    let queries = req.query

    //gets all the filters in the request
    let filters = Object.keys(queries).join(", ")

    //gets all the filters that are not price, brand, limit or search related
    let properties = []
    Object.keys(queries).forEach((key) =>
    {
        //ensure it doesn't contain any other filters
        if(key!== "search"&&key!== "max"&&key!== "min"&&key!== "brand"&&key!== "limit")
        {
            properties = [...properties, {name:key, value:queries[key]}]
        }
    })

    //queries are passed in the url not the body
    // i.e /api/results?search=mySearch&filter=myFilter
    if(!queries.search)
    {
        res.code = 400
        return next(new Error("Search required"))
    }
    try 
    {
        const results = await Product.findBySearch(String(queries.search).replace("+", " ").toLowerCase(), queries.max, queries.min, queries.brand, properties)
        if(!results.length)
        {
            res.code = 400
            return next(new Error(`No results for search '${queries.search}'`))
        }
        //if limit is passed in the query string results is sliced
        if(queries.limit)
        {
            return res.json({success:true, data:results.slice(0, Number(queries.limit)), message:`retrieved results for search '${queries.search}'${filters.length > 1 ? ` with filters ${filters}`:``}`})
        }
        return res.json({success:true, data:results, message:`retrieved results for search '${queries.search}'${filters.length > 6 ? ` with filters ${filters}`:``}`})          
    } 
    catch (error) {
        next(error)
    }
}
module.exports = getResults

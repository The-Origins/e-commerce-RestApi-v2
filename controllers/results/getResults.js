const Product = require("../../config/database").models.Product

const getResults = async (req, res, next) =>
{
    let queries = req.query
    let filters = Object.keys(queries).join(", ")
    let properties = []
    Object.keys(queries).forEach((key) =>
    {
        if(key!== "search"&&key!== "max"&&key!== "min"&&key!== "brand"&&key!== "limit")
        {
            properties = [...properties, {name:key, value:queries[key]}]
        }
    })
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

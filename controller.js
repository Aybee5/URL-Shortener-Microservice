const express = require("express")
const app = express()
const dns = require("dns")

const url = require("./models")

app.post("/api/shorturl/new", (req, res)=>{
    const originalUrl = req.body.url
    url.findOne({url: originalUrl})
    .then(urlisFound=>{
        if (urlisFound){
            console.log(urlisFound)
            res.status(200).json({msg: urlisFound})
        }
        else{
            dns.lookup(originalUrl, (err, addresses, family)=>{
                if (addresses) {
                    urlDetails = {
                        url: originalUrl,
                        short_url: Date.now()
                    }
                    url.create(urlDetails)
                    .then((result)=>{
                        res.status(201).json({result})
                    })
                    .catch((error)=>{
                        res.status(500).json({error})
                    })
                }
                else{
                    res.json({error: "Invalid Url"})
                }
            })
        }
    })
    
})

app.get("/shorturl/?:short_url", (req, res)=>{
    let shorturl = req.params.short_url
    url.findOne({short_url: shorturl}).then((result)=>{
        if (result) {
            res.redirect(`http://${result.url}`)
        }
        else{
            res.status(404).json({message:"Url not found"})
        }
    })
})

module.exports = app

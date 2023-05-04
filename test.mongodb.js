
use('wecamp')

//View all Cruds
db.Cruds.find({})

//View one Crud by id
db.Cruds.find({
    _id: ObjectId('644e93e8bdbb8dc44a83c938')
})

//Update one Crud by id
db.Cruds.updateOne({
    _id: ObjectId('644e93e8bdbb8dc44a83c938')
}, {
    $set: {
        location: "Ha Noi"
    }
})

db.Cruds.find({
    _id: ObjectId('644e93e8bdbb8dc44a83c938')
})

//Delete one Crud by id
db.Cruds.deleteOne({
    _id: ObjectId('644e93e8bdbb8dc44a83c938')
})

db.Cruds.find({
    _id: ObjectId('644e93e8bdbb8dc44a83c938')
})




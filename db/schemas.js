const idgen = require('./idgenerate.js');

module.exports = {
    
    rankListSchema: {
        _id: {
            type: String,
            default: idgen.generate
        },
        title: {
            type: String,
            required: true
        },
        rankItems: {
            type: Array,
            required: true
        },
        aggregations: { // Array of [Name, #pts] pairs
            type: Array,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        user: String,
        options: Object
    },
    
    rankingSchema: {
        _id: {
            type: String,
            default: idgen.generate
        },
        rankListId: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        // Array of integers, index 0, which corresponds to the index of each item in the ranklist
        // if I am powerranking [chocolate, strawberry, vanilla] and i put them in the order [strawberry, vanilla, chocolate]
        // my rank order is [1,2,0]
        // NOT 2,0,1
        rankOrder: { 
            type: Array,
            required: true
        },
        user: String
    },
    
    rankReductionSchema: {
        rankListId: {
            type: String,
            required: true
        },
        sortedPointTotals: { // Array of [Name, #pts] pairs
            type: Array,
            required: true
        }
    }
}

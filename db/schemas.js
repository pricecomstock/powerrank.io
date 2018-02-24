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
        rankOrder: { // Array of integers, index 0, which corresponds to the index of each item in the ranklist
            type: Array,
            required: true
        },
        user: String
    }
    
}

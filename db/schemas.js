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
            required: true,
            validate: [
                {
                    validator: function (valueList) {
                        let itemsValid = valueList.every( (value) => {
                            return value.length >= 1
                        } );
                        return itemsValid
                    },
                    message: "Every item must be at least one character!"
                },
                
                {
                    validator: function(valueList) {
                        return enoughItems = valueList.length >= 2;
                    },
                    message: "At least two items are required"
                },
                
                {
                    validator: function(valueList) {
                        let uniqueItems = valueList.filter( (value, index, self) => {
                            return self.indexOf(value) === index;
                        })
                        return uniqueItems.length === valueList.length
                    },
                    message: "Two submitted items are the same!"
                }
            ]
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
        scaleName: {
            type: String,
            validator: function(scaleName) {
                return scaleName.length < 15;
            }
        },
        rankingCount: {
            type: Number,
            default: 0
        },
        public: {
            type: Boolean,
            default: true
        },
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
            required: true,
            validate: [
                
                {
                    validator: function(valueList) {
                        return enoughItems = valueList.length >= 2;
                    },
                    message: "At least two items are required to be ranked"
                },
                
                {
                    validator: function(valueList) {
                        let uniqueItems = valueList.filter( (value, index, self) => {
                            return self.indexOf(value) === index;
                        })

                        return uniqueItems.length === valueList.length
                    },
                    message: "Cannot rank the same item twice!"
                }
            ]
        },
        user: String
    }
}

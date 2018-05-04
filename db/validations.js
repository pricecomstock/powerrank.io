

function validateRankListCreation (rankList) {
    
    const passing = 
    
    // Title no longer than 280, this may change if more details are available to be added
    rankList.title.length > 0 && rankList.title.length <= 280 &&
    
    // Not too few or too many items
    rankList.rankItems.length >= 2 && rankList.rankItems.length <= 128 &&
    
    // No items are ridiculously long
    rankList.rankItems.every( rankItem => {
        return rankItem.length >= 1 && rankItem.length <= 280
    }) &&
    
    // scale name is reasonable length
    rankList.scaleName.length <= 60 &&
    
    // username is reasonable length, this shouldn't matter with real auth
    rankList.user.length <= 24

    return passing

}

function validateRankingCreation (ranking, rankList) {

    const passing = 

    // this is a real, valid rankList key
    rankList != null &&
    
    // username no longer than 24
    ranking.user.length <= 24 &&

    // at least 2 items are ranked
    ranking.rankOrder.length >= 2 &&
    // not too many items are ranked
    ranking.rankOrder.length <= rankList.rankItems.length &&
    // items aren't ranked more than once each
    (new Set(ranking.rankOrder)).size === ranking.rankOrder.length &&
    // no items are too high of an index
    ranking.rankOrder.every( itemIndex => {
        return itemIndex >= 0 && itemIndex < rankList.rankItems.length
    })

    return passing

}

module.exports = {
    validateRankListCreation,
    validateRankingCreation
}
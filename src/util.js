function isRemote(url, condition = /^(https?:)?\/\//) {
    condition = new RegExp(condition)

    return !condition.test(url)
}

module.exports = {
    isRemote
};

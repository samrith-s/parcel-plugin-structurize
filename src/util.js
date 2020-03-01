function isNotRemote(url) {
    return !(
        url.includes('http:') ||
        url.includes('https:') ||
        url.includes('//')
    );
}

module.exports = {
    isNotRemote,
};

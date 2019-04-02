function isNotRemote(url) {
    return !(
        url.includes('http:') ||
        url.includes('https:') ||
        url.includes('//')
    );
}

function extractFileName(path = '') {
    return path.split('/').pop();
}

module.exports = {
    isNotRemote,
    extractFileName
};

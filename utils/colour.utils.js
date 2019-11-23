
function isHEXColour(hex) {
    var regex = RegExp(/^#?(?:[0-9a-f]{3}){1,2}$/i);

    return regex.test(hex);
}

module.exports = {
    isHEXColour:isHEXColour
};
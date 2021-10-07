const dummyData = require("../util/dummyData");

module.exports.getCategories = (req, res) => {
    let payload = { status: true, categories: dummyData.CATEGORIES};
    res.status(200).json(payload);
};
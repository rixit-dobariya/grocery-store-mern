const AboutPage = require("../models/AboutPage");
const AppError = require("../utils/AppError");

exports.getAboutPageService = async () => {
    const aboutPage = await AboutPage.findOne();
    if (!aboutPage) {
        return { content: "" };
    }
    return aboutPage;
};

exports.updateAboutPageService = async (content) => {
    if (!content) {
        throw new AppError("Content is required", 400);
    }

    let aboutPage = await AboutPage.findOne();

    if (!aboutPage) {
        aboutPage = await AboutPage.create({ content });
        return { aboutPage, isNew: true };
    }

    aboutPage.content = content;
    await aboutPage.save();
    return { aboutPage, isNew: false };
};

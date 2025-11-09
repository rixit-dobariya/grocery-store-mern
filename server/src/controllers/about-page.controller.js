const asyncHandler = require("../utils/asyncHandler");
const {
  getAboutPageService,
  updateAboutPageService,
} = require("../services/about-page.service");

const getAboutPage = asyncHandler(async (req, res) => {
  const aboutPage = await getAboutPageService();
  res.status(200).json({
    success: true,
    message: "About page retrieved successfully",
    data: aboutPage,
  });
});

const updateAboutPage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { aboutPage, isNew } = await updateAboutPageService(content);

  res.status(isNew ? 201 : 200).json({
    success: true,
    message: isNew
      ? "About page created successfully"
      : "About page updated successfully",
    data: aboutPage,
  });
});

module.exports = {
  getAboutPage,
  updateAboutPage,
};

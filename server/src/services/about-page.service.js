import AboutPage from "../models/AboutPage.js";
import { ApiError } from "../utils/ApiError.js";

class AboutPageService {
    async getAboutPage() {
        let aboutPage = await AboutPage.findOne();
        if (!aboutPage) {
            aboutPage = { content: '' };
        }
        return {
            message: 'About page retrieved successfully',
            data: aboutPage
        };
    }

    async updateAboutPage(content) {
        if (!content) {
            throw new ApiError(400, "Content is required");
        }

        let aboutPage = await AboutPage.findOne();

        if (!aboutPage) {
            aboutPage = new AboutPage({ content });
            await aboutPage.save();
            return {
                message: 'About page created successfully',
                data: aboutPage
            };
        }

        aboutPage.content = content;
        await aboutPage.save();

        return {
            message: 'About page updated successfully',
            data: aboutPage
        };
    }
}

export default new AboutPageService();

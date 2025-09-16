const { Page, PageSection, Row, Column } = require("../models");

exports.createPage = async (req, res) => {
    try {
        const { name, sections } = req.body;

        const page = await Page.create(
            {
                name,
                PageSections: sections.map((section) => ({
                    layoutType: section.layoutType,
                    Rows: section.rows.map((row) => ({
                        rowOrder: row.rowOrder,
                        Columns: row.columns,
                    })),
                })),
            },
            {
                include: [
                    {
                        model: PageSection,
                        include: [{ model: Row, include: [Column] }],
                    },
                ],
            }
        );

        res.status(201).json(page);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPageLayout = async (req, res) => {
    try {
        const { pageId } = req.params;

        const page = await Page.findByPk(pageId, {
            include: {
                model: PageSection,
                include: {
                    model: Row,
                    include: Column,
                },
            },
        });

        if (!page) return res.status(404).json({ message: "Page not found" });
        res.json(page);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePageLayout = async (req, res) => {
    try {
        const { pageId } = req.params;
        const updates = req.body; // you can pass updated sections/rows/columns

        const page = await Page.findByPk(pageId);
        if (!page) return res.status(404).json({ message: "Page not found" });

        await page.update(updates);

        res.json({ message: "Page updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePage = async (req, res) => {
    try {
        const { pageId } = req.params;
        const deleted = await Page.destroy({ where: { id: pageId } });

        if (!deleted) return res.status(404).json({ message: "Page not found" });
        res.json({ message: "Page deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

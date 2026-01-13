const updateExistingPhotoUrls = async () => {
    try {
        const photos = await Photo.findAll();

        for (const photo of photos) {
            if (photo.imageUrl && !photo.imageUrl.startsWith('/uploads/')) {
                // If it's just a filename, add the path
                if (!photo.imageUrl.includes('/')) {
                    await photo.update({
                        imageUrl: `/uploads/${photo.imageUrl}`
                    });
                }
                // If it's a server path, convert to URL
                else if (photo.imageUrl.includes('uploads')) {
                    const filename = photo.imageUrl.split('uploads')[1];
                    await photo.update({
                        imageUrl: `/uploads${filename.replace(/\\/g, '/')}`
                    });
                }
                console.log(`Updated photo ${photo.id}: ${photo.imageUrl}`);
            }
        }

        console.log("✅ All existing photo URLs updated");
    } catch (error) {
        console.error("Error updating existing photo URLs:", error);
    }
};
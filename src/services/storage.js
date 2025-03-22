const StorageService = {
    set: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Erro ao salvar ${key}:`, error);
        }
    },

    get: (key, defaultValue = []) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Erro ao recuperar ${key}:`, error);
            return defaultValue;
        }
    },

    update: (key, updateFn) => {
        const currentData = StorageService.get(key);
        const updatedData = updateFn(currentData);
        StorageService.set(key, updatedData);
        return updatedData;
    },

    storeDocument: (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
        });
    },

    downloadDocument: (base64Data, fileName) => {
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export default StorageService;

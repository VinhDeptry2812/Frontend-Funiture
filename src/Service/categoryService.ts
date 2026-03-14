import api from "./service";

const categoryService = {
    // Lấy danh sách category
    getCategory: async () => {
        const response = await api.get('/categories?tree=0&&all=1');
        return response.data;
    },

    // Thêm category
    addCategory: async (data: any) => {
        const response = await api.post('/categories', data);
        return response.data;
    },

    // Cập nhật category
    updateCategory: async (id: number, data: any) => {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    },

    // Xóa category
    deleteCategory: async (id: number) => {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    }
}

export default categoryService;
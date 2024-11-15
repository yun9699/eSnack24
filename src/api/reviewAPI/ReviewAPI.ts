import axios from 'axios'

const host = 'http://localhost:8080/api/v1/review'

export const fetchReviews = async (rno: number, pageRequest: { page: number, size: number }) => {
    try {
        const response = await axios.get(`${host}/list`, {
            params: {
                rno: rno,
                page: pageRequest.page,
                size: pageRequest.size
            }
        })

        return response.data
    } catch (error) {
        console.error('Error fetching reviews:', error)
        throw error
    }
}
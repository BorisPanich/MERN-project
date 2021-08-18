import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            // чтобы учитывался body, когда есть
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    // error cleaning
    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}
import { useState, useEffect } from 'react';
import { getToken } from '../services/auth';
import { fetchUsuarios } from '../services/userService';

const useFetchUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsuarios = async () => {
            try {
                const data = await fetchUsuarios(getToken());
                setUsuarios(data.resultados || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadUsuarios();
    }, []);

    return { usuarios, loading, error };
};

export default useFetchUsuarios;

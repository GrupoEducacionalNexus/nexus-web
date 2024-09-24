import { useState, useEffect } from 'react';
import { fetchPermissoes } from '../services/permissionService';

const useFetchPermissoes = () => {
    const [permissoes, setPermissoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPermissoes = async () => {
            try {
                const data = await fetchPermissoes();
                setPermissoes(data.resultados || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadPermissoes();
    }, []);

    return { permissoes, loading, error };
};

export default useFetchPermissoes;

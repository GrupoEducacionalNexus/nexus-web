export const TOKEN_KEY = "@nexus-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const setToken = (token) => localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
// export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY));    
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token); // Remova o JSON.stringify
export const getToken = () => localStorage.getItem(TOKEN_KEY); // Remova o JSON.parse


//Permissões do usuário
export const NEXUS_R = '@nexus-r';
export const setRole = (r) => localStorage.setItem(NEXUS_R, JSON.stringify(r));
export const getRole = () => JSON.parse(localStorage.getItem(NEXUS_R));

//Nome do usuário
export const NEXUS_N = '@nexus-n';
export const setNome = (r) => localStorage.setItem(NEXUS_N, JSON.stringify(r));
export const getNome = () => JSON.parse(localStorage.getItem(NEXUS_N));


export const ROLES = {
    admin: 1,
    certificacao: 2
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NEXUS_R);
}
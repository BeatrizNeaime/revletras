export const APIData = {
  cnpj: async function (cnpj) {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/\D/g, '')}`);
    if (response.status != 200) return { status: response.status, message: "CNPJ não encontrado" };
    return { status: response.status, ...await response.json() };
  }
}
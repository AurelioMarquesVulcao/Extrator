/** @format */

export default {
  key: 'Teste_de_fila',
  async handle({ data }) {
    const { user } = data
    console.log(user)
    console.log(user)
    // console.log(user)
    // console.log(user)
    // errou()
    // posso chamar uma funcao aqui
  },
}

const errou = () => {
  const error = new Error('Não foi possivél executar o job')
  throw error
}

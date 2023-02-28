/** @format */

export default {
  key: 'Teste_de_fila',
  options: {
    delay: 1100,
    priority: 1,
    attempts: 5, // If job fails it will retry till 5 times
    backoff: 50, // static 5 sec delay between retry
    // limiter: {
    //   max: 1,
    //   duration: 60000
    // },
    // repeat: {
    //   every: 10000,
    //   limit: 5
    // },
  },
  async handle({ data }) {
    const { user } = data
    // console.log(user)
    console.log(user, 'try -> cat')
    // console.log(user)
    // console.log(user)
    errou()
    // posso chamar uma funcao aqui
  },
}

const errou = () => {
  const error = new Error('Não foi possivél executar o job')
  throw error
}

/** @format */

export default {
  key: 'Teste_de_fila',
  options: {
    delay: 10,
    priority: 4,
    attempts: 5, // If job fails it will retry till 5 times
    backoff: 50000, // static 5 sec delay between retry
    timeout: 10000,
    limiter: {
      max: 3,
      duration: 1200000,
    },
    // repeat: {
    //   every: 60000,
    //   limit: 3
    // },
  },
  async handle({ data }) {
    const { user } = data
    // console.log(user)
    console.log(user, 'try -> cat -> prioridade 2')
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

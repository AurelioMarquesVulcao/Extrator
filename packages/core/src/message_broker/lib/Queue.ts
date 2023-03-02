/** @format */

import Queue from 'bull'
import * as jobs from '../jobs'

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, 'redis://127.0.0.1:6379'),
  name: job.key,
  handle: job.handle,
  options: job.options,
}))
// console.log(queues);

export default {
  
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name)

    return queue.bull.add(data, queue.options)
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('completed', job => {
        console.log(`Job with id ${job.id} has been completed`)
      })

      // queue.bull.on('global:completed', jobId => {
      //   console.log(`All ---- Job with id ${jobId} has been completed`);
      // })
      // ...whereas global events only pass the job ID:
      // queue.bull.on('global:progress', (jobId, progress) => {
      //   console.log(`Job ${jobId} is ${progress * 100}% ready!`)
      // })

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed:', job.id, err)
      })
    })
  },
}

// // usando manualmente cada job
// // acima código mais escalável.
// import Teste_de_fila from '../jobs/Teste_de_fila'

// const testeQueue = new Queue(Teste_de_fila.key, 'redis://127.0.0.1:6379')

// testeQueue.on('failed', (job, err) => {
//   console.log('Job failed:', job.id, err)
// })

// export default testeQueue

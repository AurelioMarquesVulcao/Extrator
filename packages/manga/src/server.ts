/** @format */

import { consumer, downloadSoftMessage } from '@extrator/core'

;(async () => {
  await consumer('download_images', 1, downloadSoftMessage)
})()

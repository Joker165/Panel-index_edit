// Pair code link > https://qr-hazel-alpha.vercel.app/md
// Get your session id and put it in the space created for it don't remove "
const { spawnSync } = require('child_process')
const { existsSync, writeFileSync } = require('fs')

const SESSION_ID = 'levanter_2752679e35065d42a3b38f86d40f982256' // Edit this line only, don't remove ' <- this symbol

if (!existsSync('levanter')) {
  console.log('Cloning the repository...')
  const cloneResult = spawnSync(
    'git',
    ['clone', 'https://github.com/lyfe00011/levanter.git', 'levanter'],
    {
      stdio: 'inherit',
    }
  )

  if (cloneResult.error) {
    throw new Error(`Failed to clone the repository: ${cloneResult.error.message}`)
  }

  const configPath = 'levanter/config.env'
  try {
    console.log('Writing to config.env...')
    writeFileSync(configPath, `VPS=true\nSESSION_ID=${SESSION_ID}`)
  } catch (err) {
    throw new Error(`Failed to write to config.env: ${err.message}`)
  }

  console.log('Installing dependencies...')
  const installResult = spawnSync('yarn', ['install', '--network-concurrency', '3'], {
    cwd: 'levanter',
    stdio: 'inherit',
  })

  if (installResult.error) {
    throw new Error(`Failed to install dependencies: ${installResult.error.message}`)
  }
}

spawnSync('yarn', ['start'], { cwd: 'levanter', stdio: 'inherit' })

import app from './app'

const PORT = 4001
app.listen(PORT, () => {
  console.log(`api-node rodando em http://localhost:${PORT}`)
})

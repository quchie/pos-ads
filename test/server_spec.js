/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { createServer } from '../server'

chai.use(chaiHttp)

import fakeDB from '../server/fakeClientsDB.js'

const server = createServer({
  nodeEnv: 'test',
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  timeout: 29000
})

describe('API', () => {
  it('should list ALL clients on api/v0/clients GET', (done) => {
    chai.request(server)
      .get('/api/v0/clients')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.text).to.be.an('string')
        expect(res.text).to.equal(JSON.stringify(fakeDB))
        done()
      })
  })

  it('should list ONE client on api/v0/clients/:slug GET', (done) => {
    const post = {
      name:'default',
      pricingRules: []
    }

    chai.request(server)
      .get(`/api/v0/clients/${post.slug}`)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res).to.be.json
        expect(res.text).to.be.an('string')
        expect(res.text).to.equal(JSON.stringify(post))
        done()
      })
  })
})
